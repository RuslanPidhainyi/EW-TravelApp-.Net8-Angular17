using System;
using API.DTOs;
using API.Entities;

namespace API.Interface;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message?> GetMessage(int Id);
    Task<MessageDto> GetMessagesForUser();
    Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string RecipientUsername);
    Task<bool> SaveAllAsync();
}
