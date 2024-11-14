using System;
using API.DTOs;
using API.Entities;
using API.Interface;

namespace API.Data.Repositories;

public class MessageRepository(AppDbContext context) : IMessageRepository
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

    public Task<MessageDto> GetMessagesForUser()
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string RecipientUsername)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
