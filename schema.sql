create table Books
(
    Id         int identity
        primary key,
    Name       varchar(255)          not null,
    CreatedAt  datetime default getdate(),
    UpdatedAt  datetime default getdate(),
    IsActive   bit      default 1,
    IsBorrowed bit      default 0,
    Score      float    default (-1) not null
)
go

create table UserBook
(
    Id        int identity
        primary key,
    CreatedAt datetime default getdate(),
    UpdatedAt datetime default getdate(),
    IsActive  bit      default 1,
    BookId    int      default 0 not null,
    UserId    int      default 0 not null,
    UserScore int      default (-1),
    State     int      default 1
)
go

create table Users
(
    Id        int identity
        primary key,
    Name      nvarchar(255) not null,
    CreatedAt datetime default getdate(),
    UpdatedAt datetime default getdate(),
    IsActive  bit      default 1
)
go

