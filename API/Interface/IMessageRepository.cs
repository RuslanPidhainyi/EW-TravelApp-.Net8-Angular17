using System;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interface;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message?> GetMessage(int Id);
    //Task<MessageDto> GetMessagesForUser();
    Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
    Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string RecipientUsername);
    Task<bool> SaveAllAsync();
    void AddGroup(Group group);
    void RemoveConnection(Connection connection);
    Task<Connection?> GetConnection(string connectionId);
    Task<Group?> GetMessageGroup(string groupNmae);
    Task<Group?> GetGroupForConnection(string connectionId);
}
