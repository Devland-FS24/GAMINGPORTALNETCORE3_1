using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EYGamingClub.Models
{
    public partial class EYGamingCubContext : DbContext
    {
        public EYGamingCubContext()
        {
        }

        public EYGamingCubContext(DbContextOptions<EYGamingCubContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activities> Activities { get; set; }
        public virtual DbSet<Admins> Admins { get; set; }
        public virtual DbSet<Audits> Audits { get; set; }
        public virtual DbSet<Cards> Cards { get; set; }
        public virtual DbSet<Claims> Claims { get; set; }
        public virtual DbSet<FailedAttempts> FailedAttempts { get; set; }
        public virtual DbSet<GameEvent> GameEvent { get; set; }
        public virtual DbSet<GameSessions> GameSessions { get; set; }
        public virtual DbSet<Players> Players { get; set; }
        public virtual DbSet<Questions> Questions { get; set; }
        public virtual DbSet<Winners> Winners { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQKK17;Database=EYGamingCub;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activities>(entity =>
            {
                entity.HasKey(e => e.ActivityId);

                entity.Property(e => e.ActivityId).HasColumnName("ActivityID");

                entity.Property(e => e.ActivityDate).HasColumnType("date");

                entity.Property(e => e.ActivityType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Gpncode)
                    .IsRequired()
                    .HasColumnName("GPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Observations)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Admins>(entity =>
            {
                entity.HasKey(e => e.AdminId);

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.CreationDate).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Gpncode)
                    .IsRequired()
                    .HasColumnName("GPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Audits>(entity =>
            {
                entity.HasKey(e => e.AuditId);

                entity.Property(e => e.CreationDate).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Gpncode)
                    .IsRequired()
                    .HasColumnName("GPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.LocationLeadAuthGpncode)
                    .IsRequired()
                    .HasColumnName("LocationLeadAuthGPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.SlauthGpncode)
                    .IsRequired()
                    .HasColumnName("SLAuthGPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Cards>(entity =>
            {
                entity.HasKey(e => e.QuestionPlayerId);

                entity.Property(e => e.QuestionPlayerId).HasColumnName("QuestionPlayerID");

                entity.Property(e => e.GameSessionId).HasColumnName("GameSessionID");

                entity.Property(e => e.PlayerId).HasColumnName("PlayerID");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.HasOne(d => d.GameSession)
                    .WithMany(p => p.Cards)
                    .HasForeignKey(d => d.GameSessionId)
                    .HasConstraintName("FK_Cards_GameSessions");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.Cards)
                    .HasForeignKey(d => d.PlayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cards_Players");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.Cards)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cards_Questions");
            });

            modelBuilder.Entity<Claims>(entity =>
            {
                entity.HasKey(e => e.ClaimId);

                entity.Property(e => e.ClaimDate).HasColumnType("date");

                entity.Property(e => e.ClaimerSlmanagerEmail)
                    .IsRequired()
                    .HasColumnName("ClaimerSLManagerEmail")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ClaimerSlmanagerGpncode)
                    .IsRequired()
                    .HasColumnName("ClaimerSLManagerGPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ClaimerSlmanagerName)
                    .IsRequired()
                    .HasColumnName("ClaimerSLManagerName")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Gpncode)
                    .IsRequired()
                    .HasColumnName("GPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.LocationLeadEmail)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.LocationLeadGpncode)
                    .IsRequired()
                    .HasColumnName("LocationLeadGPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Resolution)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.Claims)
                    .HasForeignKey(d => d.AdminId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Claims_Admins");
            });

            modelBuilder.Entity<FailedAttempts>(entity =>
            {
                entity.HasKey(e => e.FailedAttemptId);

                entity.Property(e => e.Card)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.QuestionsAsked)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.GameSession)
                    .WithMany(p => p.FailedAttempts)
                    .HasForeignKey(d => d.GameSessionId)
                    .HasConstraintName("FK_FailedAttempts_GameSessions");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.FailedAttempts)
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("FK_FailedAttempts_Players");
            });

            modelBuilder.Entity<GameEvent>(entity =>
            {
                entity.HasKey(e => e.EventId)
                    .HasName("PK_Event");

                entity.Property(e => e.EventType)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.GameSessionId).HasColumnName("GameSessionID");

                entity.Property(e => e.NextQstatus)
                    .HasColumnName("NextQStatus")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.GameSession)
                    .WithMany(p => p.GameEvent)
                    .HasForeignKey(d => d.GameSessionId)
                    .HasConstraintName("FK_GameEvent_GameSessions");
            });

            modelBuilder.Entity<GameSessions>(entity =>
            {
                entity.HasKey(e => e.GameSessionId);

                entity.Property(e => e.GameSessionId).HasColumnName("GameSessionID");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.GameType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Observations)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.GameSessions)
                    .HasForeignKey(d => d.AdminId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GameSessions_Admins");
            });

            modelBuilder.Entity<Players>(entity =>
            {
                entity.HasKey(e => e.PlayerId);

                entity.Property(e => e.PlayerId).HasColumnName("PlayerID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.GameSessionId).HasColumnName("GameSessionID");

                entity.Property(e => e.Gpncode)
                    .IsRequired()
                    .HasColumnName("GPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PlayerName)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.GameSession)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.GameSessionId)
                    .HasConstraintName("FK_Players_GameSessions");
            });

            modelBuilder.Entity<Questions>(entity =>
            {
                entity.HasKey(e => e.QuestionId);

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.Answer)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.GameSessionId).HasColumnName("GameSessionID");

                entity.Property(e => e.QuestionText)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.GameSession)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.GameSessionId)
                    .HasConstraintName("FK_Questions_GameSessions");
            });

            modelBuilder.Entity<Winners>(entity =>
            {
                entity.HasKey(e => e.WinnerId);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Gpncode)
                    .IsRequired()
                    .HasColumnName("GPNCode")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PlayerId).HasColumnName("PlayerID");

                entity.Property(e => e.PlayerNick)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PrizeType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.GameSession)
                    .WithMany(p => p.Winners)
                    .HasForeignKey(d => d.GameSessionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Winners_GameSessions");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.Winners)
                    .HasForeignKey(d => d.PlayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Winners_Players");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
