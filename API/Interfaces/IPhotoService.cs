using CloudinaryDotNet.Actions;

namespace API.Interface;

public interface IPhotoService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
    Task<ImageUploadResult> AddPostPhotoAsync(IFormFile file);
}
