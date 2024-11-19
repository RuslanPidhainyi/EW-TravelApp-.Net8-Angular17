﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Interests")
                        .HasColumnType("TEXT");

                    b.Property<string>("KnownAs")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.Like", b =>
                {
                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PostId")
                        .HasColumnType("INTEGER");

                    b.HasKey("AppUserId", "PostId");

                    b.HasIndex("PostId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("API.Entities.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DateRead")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("MessageSent")
                        .HasColumnType("TEXT");

                    b.Property<bool>("RecipientDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RecipientId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RecipientUsername")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("SenderDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SenderId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SenderUsername")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RecipientId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("API.Entities.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsMain")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PublicId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("GeneralPhotos");
                });

            modelBuilder.Entity("API.Entities.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<bool>("EntranceFee")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("GroceryStore")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Guide")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastCity")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastCountry")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("LocalTransport")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LocationCity")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LocationCountry")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("MaxPriceEntrFee")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MaxPriceGroceryStore")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MaxPriceGuide")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MaxPriceLocalTrans")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MaxPricePlaceStay")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MinPriceEntrFee")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MinPriceGroceryStore")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MinPriceGuide")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MinPriceLocalTrans")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MinPricePlaceStay")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("PlaceStay")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PublicId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("TravelTime")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TypePlaceStay")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("API.Entities.Like", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Likes")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Post", "Post")
                        .WithMany("Likes")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("API.Entities.Message", b =>
                {
                    b.HasOne("API.Entities.AppUser", "Recipient")
                        .WithMany("MessagesReceived")
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", "Sender")
                        .WithMany("MessagesSent")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Recipient");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("API.Entities.Photo", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("GeneralPhotos")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.Post", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Posts")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("GeneralPhotos");

                    b.Navigation("Likes");

                    b.Navigation("MessagesReceived");

                    b.Navigation("MessagesSent");

                    b.Navigation("Posts");
                });

            modelBuilder.Entity("API.Entities.Post", b =>
                {
                    b.Navigation("Likes");
                });
#pragma warning restore 612, 618
        }
    }
}
