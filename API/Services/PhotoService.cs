using API.Interface;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    private async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file, Transformation transformation)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = transformation,
                Folder = "EngineerWork-2024-TravelApp-dotnet8"
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public PhotoService(IOptions<CloudinarySettings> config)
    {
        var acc = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        _cloudinary = new Cloudinary(acc);
    }

    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
    {
        var transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face");
        return await UploadPhotoAsync(file, transformation);
    }
    public async Task<ImageUploadResult> AddPostPhotoAsync(IFormFile file)
    {
        var transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("auto");
        return await UploadPhotoAsync(file, transformation);
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        return await _cloudinary.DestroyAsync(deleteParams);
    }
}