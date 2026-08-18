# অপ্রকাশিত — Session Only AI

এই version-এ **Permanent Memory নেই** এবং Firestore/Database-এ chat history বা memory সংরক্ষণ করা হয় না।

## কীভাবে কাজ করে

Login → Firebase Authentication → বর্তমান browser session-এর `sessionMessages` → secure backend → AI provider.

Page reload/new session হলে client-side conversation context হারিয়ে যাবে।

## Setup

1. Firebase project তৈরি করো এবং Email/Password Authentication চালু করো।
2. Firebase Web App config `js/config.js`-এ বসাও।
3. Backend deploy করো।
4. Backend environment variables-এ Firebase Admin service account এবং বৈধ AI provider key রাখো।
5. Backend URL `js/config.js`-এ বসাও।
6. GitHub Pages-এ frontend deploy করো।

## Security

AI key কখনো frontend-এ রাখবে না। Firebase ID token backend verify করে। এখানে Firestore দরকার নেই; `firebase.rules` শুধু safety placeholder।

## Unlimited requirement

Application-এর নিজের daily/monthly/question limit নেই। কিন্তু provider-এর quota, rate limit এবং model context limit থাকবে। সেগুলো bypass করা হবে না।

## Session context

শুধু বর্তমান page/session-এর `sessionMessages` AI request-এ পাঠানো হয়। Permanent memory বা database persistence নেই।

## Fallback

`AI_FALLBACKS`-এ আগে থেকেই বৈধভাবে configured provider দিতে পারো। Provider limit/error হলে পরের configured provider চেষ্টা করবে। কোনো key সংগ্রহ বা bypass করবে না।

## Note

এই starter-এর attachment button file নির্বাচন করে, কিন্তু backend-এ PDF/DOCX/image parsing এখনো করা হয়নি। ভুলভাবে “file analyzed” দাবি করা হয় না।
