import { db } from '@/db';
import { quotes } from '@/db/schema';

async function main() {
    const sampleQuotes = [
        // Motivation Category (10 quotes)
        {
            text: 'You are braver than you believe, stronger than you seem, and smarter than you think.',
            author: 'A.A. Milne',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'The only way out is through.',
            author: 'Robert Frost',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'One small positive thought in the morning can change your whole day.',
            author: 'Zig Ziglar',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'Progress, not perfection.',
            author: 'Unknown',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'Every day may not be good, but there is something good in every day.',
            author: 'Alice Morse Earle',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'You don\'t have to be great to start, but you have to start to be great.',
            author: 'Zig Ziglar',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'The secret of getting ahead is getting started.',
            author: 'Mark Twain',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'Believe you can and you\'re halfway there.',
            author: 'Theodore Roosevelt',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'Small steps in the right direction can turn out to be the biggest step of your life.',
            author: 'Unknown',
            category: 'motivation',
            createdAt: new Date()
        },
        {
            text: 'It always seems impossible until it\'s done.',
            author: 'Nelson Mandela',
            category: 'motivation',
            createdAt: new Date()
        },
        // Mindfulness Category (10 quotes)
        {
            text: 'Wherever you are, be all there.',
            author: 'Jim Elliot',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'The present moment is all we have and all we ever will have.',
            author: 'Thich Nhat Hanh',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.',
            author: 'Oprah Winfrey',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'In today\'s rush, we all think too much, seek too much, want too much, and forget about the joy of just being.',
            author: 'Eckhart Tolle',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'The best way to capture moments is to pay attention. This is how we cultivate mindfulness.',
            author: 'Jon Kabat-Zinn',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'Mindfulness isn\'t difficult, we just need to remember to do it.',
            author: 'Sharon Salzberg',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.',
            author: 'Thich Nhat Hanh',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'Be happy in the moment, that\'s enough. Each moment is all we need, not more.',
            author: 'Mother Teresa',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'The little things? The little moments? They aren\'t little.',
            author: 'Jon Kabat-Zinn',
            category: 'mindfulness',
            createdAt: new Date()
        },
        {
            text: 'Mindfulness is a way of befriending ourselves and our experience.',
            author: 'Jon Kabat-Zinn',
            category: 'mindfulness',
            createdAt: new Date()
        },
        // Self-Compassion Category (10 quotes)
        {
            text: 'Talk to yourself like you would to someone you love.',
            author: 'Brené Brown',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.',
            author: 'Buddha',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'Be gentle with yourself. You are doing the best you can.',
            author: 'Unknown',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'Self-compassion is simply giving the same kindness to ourselves that we would give to others.',
            author: 'Christopher Germer',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'You are worthy of love and belonging, not because you are perfect, but because you are you.',
            author: 'Brené Brown',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'Be kind to yourself. It\'s okay to be a work in progress.',
            author: 'Unknown',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'Treat yourself as you would treat a good friend.',
            author: 'Kristin Neff',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'You are allowed to be both a masterpiece and a work in progress simultaneously.',
            author: 'Sophia Bush',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'Self-care is not self-indulgence, it is self-preservation.',
            author: 'Audre Lorde',
            category: 'self-compassion',
            createdAt: new Date()
        },
        {
            text: 'Remember, you have been criticizing yourself for years and it hasn\'t worked. Try approving of yourself and see what happens.',
            author: 'Louise Hay',
            category: 'self-compassion',
            createdAt: new Date()
        }
    ];

    await db.insert(quotes).values(sampleQuotes);
    
    console.log('✅ Quotes seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});