using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class MessageRepository(AppDbContext context, IMapper mapper) : IMessageRepository
{
    public void AddMessage(Message message)
    {
        context.Messages.Add(message);
    }

    public void DeleteMessage(Message message)
    {
        context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessage(int Id)
    {
        return await context.Messages.FindAsync(Id);
    }


    // public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
    // {   
    //     //note: wyswietlamy wysłane messages
    //     var query = context.Messages
    //         .OrderByDescending(x => x.MessageSent)
    //         .AsQueryable();

    //     //note: wykorzystuje dla container "switch case"
    //     query = messageParams.Container switch
    //     {   
    //         //note: Jezeli "switch case" = Inbox / Skrzynka odbiorcy - to nazwaUser'a odbiorcy pasuje do biezacej nazwyUser'a
    //         "Inbox" => query.Where(x => x.Recipient.UserName == messageParams.Username && x.RecipientDeleted == false),
            
    //         //Jezeli "switch case" = Outbox / Skrzynka nadawcy - to ...
    //         "Outbox" => query.Where(x => x.Sender.UserName == messageParams.Username && x.SenderDeleted == false),

    //         //note: Jezeli "switch case" = unread(jest domyslnym parametrem) / Nie przeczytane - to ...
    //         _ => query.Where(x => x.Recipient.UserName == messageParams.Username && x.DateRead == null && x.RecipientDeleted == false)
    //     };

    //     //note: .ProjectTo<...Dto>(mapper. ...) - Project przekazuje dostawce konfiguracji mapper
    //     var messages = query.ProjectTo<MessageDto>(mapper.ConfigurationProvider);

    //     return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
    // }

    public async Task<IEnumerable<MessageDto>> GetMessagesForUser(string username, string container)
    {   
        //note: wyswietlamy wysłane messages
        var query = context.Messages
            .OrderByDescending(x => x.MessageSent)
            .AsQueryable();

        //note: wykorzystuje dla container "switch case" (Indox, Outbox, Unread(_))
        query = container switch
        {   
            //note: Jezeli "switch case" = Inbox / Skrzynka odbiorcy - to nazwaUser'a odbiorcy pasuje do biezacej nazwyUser'a
            "Inbox" => query.Where(x => x.Recipient.UserName == username && !x.RecipientDeleted),
            
            //Jezeli "switch case" = Outbox / Skrzynka nadawcy - to ...
            "Outbox" => query.Where(x => x.Sender.UserName == username && !x.SenderDeleted),

            //note: Jezeli "switch case" = unread(jest domyslnym parametrem) / Nie przeczytane - to ...
            _ => query.Where(x => x.Recipient.UserName == username && x.DateRead == null && !x.RecipientDeleted)
        };

        //note: .ProjectTo<...Dto>(mapper. ...) - Project przekazuje dostawce konfiguracji mapper
        var messages = await query.ProjectTo<MessageDto>(mapper.ConfigurationProvider).ToListAsync();
        
        return messages;
    }

    public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
    {   
        //note: liste jednostek messages z bd
        var messages = await context.Messages
            .Where(x =>
                x.RecipientUsername == currentUsername && x.RecipientDeleted == false && x.SenderUsername == recipientUsername
                || x.SenderUsername == currentUsername && x.SenderDeleted == false && x.RecipientUsername == recipientUsername)
            .OrderBy(x => x.MessageSent)
            .ProjectTo<MessageDto>(mapper.ConfigurationProvider)
            .ToListAsync();
        
        //note: Sprawdzania czy są jakies nie przyczytane messages
        var unreadMessages = messages
            .Where(x => x.DateRead == null && x.RecipientUsername == currentUsername)
            .ToList();

        //note: Jesli są nie przyczytane messages - to ustawia daty na aktualną datę co skuteczne oznacza messages jako przeczytaną
        if(unreadMessages.Count != 0)
        {
            unreadMessages.ForEach(x => x.DateRead = DateTime.UtcNow);
            await context.SaveChangesAsync();
        }

        //note: odsyła nasz messages
        return messages;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void AddGroup(Group group)
    {
        context.Groups.Add(group);
    }

    public void RemoveConnection(Connection connection)
    {
        context.Connections.Remove(connection);
    }
    
    public async Task<Connection?> GetConnection(string connectionId)
    {
        return await context.Connections.FindAsync(connectionId);
    }

    public async Task<Group?> GetMessageGroup(string groupName)
    {
        return await context.Groups
            .Include(x => x.Connections)
            .FirstOrDefaultAsync(x => x.Name == groupName);
    }

    public async Task<Group?> GetGroupForConnection(string connectionId)
    {
        return await context.Groups
            .Include(x => x.Connections)
            .Where(x => x.Connections.Any(c => c.ConnectionId == connectionId))
            .FirstOrDefaultAsync();
    }
}
