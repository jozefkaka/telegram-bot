from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, ContextTypes, filters
import os

TOKEN = os.getenv("BOT_TOKEN")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = (
        "👋 سلام، خوش اومدی!\n\n"
        "✅ ربات با موفقیت راه‌اندازی شد.\n\n"
        "👨‍💻 سازنده: جوزف کاکا\n\n"
        "🤖 من یک ربات تلگرام هستم و برای کمک به کاربران ساخته شده‌ام.\n"
        "فعلاً در نسخه آزمایشی هستم و به‌زودی قابلیت‌های بیشتری به من اضافه می‌شود.\n\n"
        "💬 هر پیامی برای من بفرستی، آن را دریافت می‌کنم."
    )

    await update.message.reply_text(text)

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        f"📩 پیام شما:\n\n{update.message.text}"
    )

app = Application.builder().token(TOKEN).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

print("Bot is running...")
app.run_polling()
