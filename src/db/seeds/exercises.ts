import { db } from '@/db';
import { exercises } from '@/db/schema';

async function main() {
    const sampleExercises = [
        // Breathing Exercises (4)
        {
            title: 'Box Breathing',
            description: 'A calming 4-4-4-4 breathing pattern that helps reduce stress and improve focus.',
            category: 'breathing',
            difficulty: 'easy',
            durationMinutes: 5,
            instructions: 'Step 1: Find a comfortable seated position with your back straight.\nStep 2: Close your eyes and take a moment to relax your body.\nStep 3: Inhale slowly through your nose for 4 counts.\nStep 4: Hold your breath for 4 counts.\nStep 5: Exhale slowly through your mouth for 4 counts.\nStep 6: Hold your breath again for 4 counts.\nStep 7: Repeat this cycle for 5 minutes.\nStep 8: Notice how your body feels more relaxed with each breath.',
            createdAt: new Date()
        },
        {
            title: '4-7-8 Breathing',
            description: 'A powerful breathing technique designed to promote relaxation and better sleep.',
            category: 'breathing',
            difficulty: 'easy',
            durationMinutes: 4,
            instructions: 'Step 1: Sit or lie down in a comfortable position.\nStep 2: Place the tip of your tongue behind your upper front teeth.\nStep 3: Exhale completely through your mouth, making a whoosh sound.\nStep 4: Close your mouth and inhale quietly through your nose for 4 counts.\nStep 5: Hold your breath for 7 counts.\nStep 6: Exhale completely through your mouth for 8 counts, making a whoosh sound.\nStep 7: This completes one breath cycle.\nStep 8: Repeat the cycle three more times for a total of four breaths.\nStep 9: Practice this twice daily for best results.',
            createdAt: new Date()
        },
        {
            title: 'Diaphragmatic Breathing',
            description: 'Deep belly breathing that engages the diaphragm for maximum oxygen intake and relaxation.',
            category: 'breathing',
            difficulty: 'medium',
            durationMinutes: 10,
            instructions: 'Step 1: Lie on your back with knees bent and feet flat on the floor.\nStep 2: Place one hand on your chest and the other on your belly.\nStep 3: Breathe in slowly through your nose, allowing your belly to rise.\nStep 4: Your chest should remain relatively still.\nStep 5: Exhale slowly through pursed lips, feeling your belly fall.\nStep 6: Continue this pattern, focusing on the rise and fall of your belly.\nStep 7: Practice for 5-10 minutes, twice daily.\nStep 8: Notice how this deeper breathing calms your nervous system.',
            createdAt: new Date()
        },
        {
            title: 'Alternate Nostril Breathing',
            description: 'A yogic breathing technique that balances both hemispheres of the brain and reduces anxiety.',
            category: 'breathing',
            difficulty: 'medium',
            durationMinutes: 7,
            instructions: 'Step 1: Sit comfortably with your spine straight.\nStep 2: Use your right thumb to close your right nostril.\nStep 3: Inhale slowly through your left nostril.\nStep 4: Close your left nostril with your ring finger.\nStep 5: Release your thumb and exhale through your right nostril.\nStep 6: Inhale through your right nostril.\nStep 7: Close your right nostril and exhale through your left.\nStep 8: This completes one round.\nStep 9: Continue for 5-10 rounds.\nStep 10: End by exhaling through your left nostril.',
            createdAt: new Date()
        },
        // Stress Relief Exercises (4)
        {
            title: 'Progressive Muscle Relaxation',
            description: 'Systematically tense and relax different muscle groups to release physical stress.',
            category: 'stress',
            difficulty: 'easy',
            durationMinutes: 15,
            instructions: 'Step 1: Find a quiet space and lie down comfortably.\nStep 2: Close your eyes and take three deep breaths.\nStep 3: Start with your toes - curl them tightly for 5 seconds.\nStep 4: Release and notice the difference for 10 seconds.\nStep 5: Move to your calves - tense them for 5 seconds, then release.\nStep 6: Continue with thighs, buttocks, stomach, chest, arms, hands, shoulders, neck, and face.\nStep 7: For each muscle group, tense for 5 seconds and relax for 10 seconds.\nStep 8: Pay attention to the feeling of relaxation in each area.\nStep 9: Take three deep breaths at the end.\nStep 10: Slowly open your eyes when ready.',
            createdAt: new Date()
        },
        {
            title: 'Body Scan Meditation',
            description: 'A mindfulness practice that brings awareness to physical sensations throughout your body.',
            category: 'stress',
            difficulty: 'easy',
            durationMinutes: 12,
            instructions: 'Step 1: Lie down in a comfortable position.\nStep 2: Close your eyes and breathe naturally.\nStep 3: Bring attention to the top of your head.\nStep 4: Notice any sensations - warmth, tingling, or tension.\nStep 5: Slowly move your attention down to your forehead, eyes, and jaw.\nStep 6: Continue scanning down through your neck, shoulders, and arms.\nStep 7: Move through your chest, belly, and back.\nStep 8: Scan your hips, legs, and feet.\nStep 9: If you notice tension, breathe into that area.\nStep 10: End by taking three deep breaths and slowly opening your eyes.',
            createdAt: new Date()
        },
        {
            title: 'Grounding 5-4-3-2-1',
            description: 'A sensory awareness technique that anchors you to the present moment and reduces stress.',
            category: 'stress',
            difficulty: 'easy',
            durationMinutes: 8,
            instructions: 'Step 1: Sit or stand in a comfortable position.\nStep 2: Take a deep breath and look around you.\nStep 3: Name 5 things you can see - be specific and detailed.\nStep 4: Name 4 things you can physically feel (like your feet on the ground).\nStep 5: Name 3 things you can hear right now.\nStep 6: Name 2 things you can smell (or would like to smell).\nStep 7: Name 1 thing you can taste (or imagine tasting).\nStep 8: Take another deep breath.\nStep 9: Notice how you feel more present and grounded.\nStep 10: Repeat anytime you feel overwhelmed.',
            createdAt: new Date()
        },
        {
            title: 'Mindful Walking',
            description: 'A walking meditation that combines gentle movement with present-moment awareness.',
            category: 'stress',
            difficulty: 'easy',
            durationMinutes: 20,
            instructions: 'Step 1: Find a quiet path or space where you can walk slowly.\nStep 2: Stand still and take three deep breaths.\nStep 3: Begin walking at a slower pace than usual.\nStep 4: Notice the sensation of your feet touching the ground.\nStep 5: Feel the movement of your legs and arms.\nStep 6: Observe your surroundings without judgment.\nStep 7: If your mind wanders, gently bring attention back to walking.\nStep 8: Notice sounds, sights, and sensations around you.\nStep 9: Continue for 15-20 minutes.\nStep 10: End by standing still and taking three deep breaths.',
            createdAt: new Date()
        },
        // Tension Release Exercises (4)
        {
            title: 'Shoulder Rolls',
            description: 'Simple shoulder movements that release tension from desk work and stress.',
            category: 'tension',
            difficulty: 'easy',
            durationMinutes: 5,
            instructions: 'Step 1: Sit or stand with your spine straight.\nStep 2: Relax your arms at your sides.\nStep 3: Slowly roll your shoulders forward in a circular motion.\nStep 4: Complete 10 forward rolls.\nStep 5: Pause and take a deep breath.\nStep 6: Now roll your shoulders backward in a circular motion.\nStep 7: Complete 10 backward rolls.\nStep 8: Alternate between forward and backward rolls.\nStep 9: Notice the release of tension in your shoulders.\nStep 10: Repeat anytime you feel shoulder tightness.',
            createdAt: new Date()
        },
        {
            title: 'Neck Stretches',
            description: 'Gentle stretches that relieve neck tension and improve flexibility.',
            category: 'tension',
            difficulty: 'easy',
            durationMinutes: 6,
            instructions: 'Step 1: Sit comfortably with your back straight.\nStep 2: Slowly tilt your head to the right, bringing ear toward shoulder.\nStep 3: Hold for 15-20 seconds, breathing deeply.\nStep 4: Return to center and repeat on the left side.\nStep 5: Gently tilt your head forward, chin toward chest.\nStep 6: Hold for 15-20 seconds.\nStep 7: Slowly tilt your head back, looking up at the ceiling.\nStep 8: Hold for 10 seconds.\nStep 9: Turn your head to look over your right shoulder, hold 15 seconds.\nStep 10: Repeat turning to the left shoulder.',
            createdAt: new Date()
        },
        {
            title: 'Jaw Release',
            description: 'Targeted exercises to release jaw tension often caused by stress and teeth clenching.',
            category: 'tension',
            difficulty: 'easy',
            durationMinutes: 5,
            instructions: 'Step 1: Find a comfortable seated position.\nStep 2: Place your tongue on the roof of your mouth.\nStep 3: Slowly open your mouth as wide as comfortable.\nStep 4: Hold for 5 seconds, then slowly close.\nStep 5: Repeat 5 times.\nStep 6: Massage your jaw muscles in small circles with your fingertips.\nStep 7: Place your fingers on your temples and massage gently.\nStep 8: Open and close your mouth slowly 10 times.\nStep 9: Yawn deeply to stretch the jaw muscles.\nStep 10: End by relaxing your face completely.',
            createdAt: new Date()
        },
        {
            title: 'Full Body Stretch',
            description: 'A comprehensive stretching routine that releases tension throughout your entire body.',
            category: 'tension',
            difficulty: 'medium',
            durationMinutes: 15,
            instructions: 'Step 1: Stand with feet hip-width apart.\nStep 2: Reach your arms overhead and stretch upward.\nStep 3: Hold for 10 seconds, breathing deeply.\nStep 4: Bend to the right side, stretching your left side.\nStep 5: Hold for 15 seconds, then switch sides.\nStep 6: Roll down slowly, letting your head and arms hang.\nStep 7: Hold this forward fold for 20 seconds.\nStep 8: Slowly roll back up, one vertebra at a time.\nStep 9: Do arm circles - 10 forward, 10 backward.\nStep 10: Finish with gentle twists to each side.',
            createdAt: new Date()
        },
        // Anxiety Management Exercises (4)
        {
            title: 'Guided Visualization',
            description: 'Use mental imagery to create a sense of calm and reduce anxious thoughts.',
            category: 'anxiety',
            difficulty: 'easy',
            durationMinutes: 10,
            instructions: 'Step 1: Find a quiet space and close your eyes.\nStep 2: Take three deep, calming breaths.\nStep 3: Imagine yourself in a peaceful place - a beach, forest, or mountain.\nStep 4: Visualize the details - colors, sounds, and sensations.\nStep 5: Feel the warmth of the sun or coolness of the breeze.\nStep 6: Hear the sounds of nature around you.\nStep 7: Notice how peaceful and safe you feel in this place.\nStep 8: Stay in this visualization for 5-7 minutes.\nStep 9: When ready, slowly bring your awareness back.\nStep 10: Open your eyes and carry this calm feeling with you.',
            createdAt: new Date()
        },
        {
            title: 'Worry Time',
            description: 'A structured approach to managing anxious thoughts by containing them to a specific time.',
            category: 'anxiety',
            difficulty: 'medium',
            durationMinutes: 15,
            instructions: 'Step 1: Choose a specific 15-minute time slot each day.\nStep 2: Throughout the day, postpone worries to this designated time.\nStep 3: Write down worries as they arise, then let them go.\nStep 4: During your worry time, sit down with your list.\nStep 5: Spend 5 minutes reviewing each worry.\nStep 6: Ask yourself: Is this worry realistic? Can I control it?\nStep 7: Write down one action step for controllable worries.\nStep 8: Practice letting go of uncontrollable worries.\nStep 9: After 15 minutes, close your notebook and move on.\nStep 10: Notice how this reduces anxiety throughout the day.',
            createdAt: new Date()
        },
        {
            title: 'Present Moment Awareness',
            description: 'Mindfulness practice that anchors you to the present, reducing anxiety about past or future.',
            category: 'anxiety',
            difficulty: 'easy',
            durationMinutes: 8,
            instructions: 'Step 1: Sit comfortably and close your eyes.\nStep 2: Notice your breath without trying to change it.\nStep 3: Feel the sensation of air moving in and out.\nStep 4: When thoughts arise, acknowledge them without judgment.\nStep 5: Gently return your focus to your breath.\nStep 6: Notice sounds around you without labeling them.\nStep 7: Feel the contact points where your body touches the chair.\nStep 8: Observe any physical sensations in your body.\nStep 9: Continue for 5-8 minutes.\nStep 10: Slowly open your eyes when ready.',
            createdAt: new Date()
        },
        {
            title: 'Counting Meditation',
            description: 'A simple counting technique that occupies the anxious mind and promotes calm.',
            category: 'anxiety',
            difficulty: 'easy',
            durationMinutes: 10,
            instructions: 'Step 1: Sit or lie down in a comfortable position.\nStep 2: Close your eyes and relax your body.\nStep 3: On your next inhale, silently count "one".\nStep 4: On your exhale, count "two".\nStep 5: Continue counting each breath up to ten.\nStep 6: When you reach ten, start over at one.\nStep 7: If you lose count, simply start again at one.\nStep 8: Don\'t worry about perfection - the practice itself is calming.\nStep 9: Continue for 10 minutes.\nStep 10: Notice how your anxiety has decreased.',
            createdAt: new Date()
        },
        // Depression Support Exercises (4)
        {
            title: 'Gratitude Practice',
            description: 'Shift focus to positive aspects of life to combat negative thought patterns.',
            category: 'depression',
            difficulty: 'easy',
            durationMinutes: 10,
            instructions: 'Step 1: Find a comfortable seated position with a journal.\nStep 2: Take three deep breaths to center yourself.\nStep 3: Think of three things you\'re grateful for today.\nStep 4: Write each one down with specific details.\nStep 5: Reflect on why each thing matters to you.\nStep 6: Notice the positive feelings that arise.\nStep 7: Think of one person you appreciate and why.\nStep 8: Consider one thing about yourself you\'re grateful for.\nStep 9: Read through your list slowly.\nStep 10: Practice this daily, ideally at the same time each day.',
            createdAt: new Date()
        },
        {
            title: 'Energy Movement',
            description: 'Gentle physical movements designed to lift mood and increase energy levels.',
            category: 'depression',
            difficulty: 'easy',
            durationMinutes: 12,
            instructions: 'Step 1: Stand up and shake out your whole body gently.\nStep 2: March in place for 30 seconds, lifting knees high.\nStep 3: Do 10 jumping jacks at your own pace.\nStep 4: Reach your arms up and down 10 times.\nStep 5: Do side-to-side sways with your arms overhead.\nStep 6: Dance freely to uplifting music for 2 minutes.\nStep 7: Do 10 squats or modified squats.\nStep 8: Stretch your arms wide and take deep breaths.\nStep 9: End with gentle bouncing on your feet.\nStep 10: Notice any shift in your energy and mood.',
            createdAt: new Date()
        },
        {
            title: 'Nature Connection',
            description: 'Engage with nature to boost mood and reduce symptoms of depression.',
            category: 'depression',
            difficulty: 'easy',
            durationMinutes: 20,
            instructions: 'Step 1: Go outside to a natural setting - park, garden, or yard.\nStep 2: Leave your phone behind or on silent.\nStep 3: Stand still and take three deep breaths of fresh air.\nStep 4: Look around and notice five natural things you see.\nStep 5: Touch a tree, plant, or grass - feel the texture.\nStep 6: Listen to birds, wind, or other natural sounds.\nStep 7: Walk slowly and mindfully for 10-15 minutes.\nStep 8: Sit down and observe nature for 5 minutes.\nStep 9: Notice how you feel compared to when you started.\nStep 10: Commit to doing this regularly, even briefly.',
            createdAt: new Date()
        },
        {
            title: 'Positive Affirmations',
            description: 'Use empowering statements to challenge negative self-talk and boost self-esteem.',
            category: 'depression',
            difficulty: 'easy',
            durationMinutes: 8,
            instructions: 'Step 1: Stand in front of a mirror or sit comfortably.\nStep 2: Take three deep, grounding breaths.\nStep 3: Say aloud: "I am worthy of love and happiness."\nStep 4: Repeat: "I am doing the best I can."\nStep 5: Say: "This feeling is temporary, and I will get through it."\nStep 6: Affirm: "I deserve good things in my life."\nStep 7: State: "I am stronger than I think."\nStep 8: Say each affirmation slowly and with intention.\nStep 9: Notice any resistance and acknowledge it gently.\nStep 10: Choose 2-3 affirmations to repeat throughout the day.',
            createdAt: new Date()
        },
        // Nervousness Relief Exercises (4)
        {
            title: 'Hand Warming',
            description: 'Use biofeedback technique to calm the nervous system and reduce physical nervousness.',
            category: 'nervousness',
            difficulty: 'easy',
            durationMinutes: 7,
            instructions: 'Step 1: Sit comfortably with hands resting on your lap.\nStep 2: Close your eyes and take three deep breaths.\nStep 3: Focus your attention on your hands.\nStep 4: Imagine warmth flowing from your core into your hands.\nStep 5: Visualize your hands getting warmer and warmer.\nStep 6: Feel the tingling sensation as blood flow increases.\nStep 7: Continue focusing on warmth for 5 minutes.\nStep 8: Notice how this relaxes your entire body.\nStep 9: Open your eyes slowly.\nStep 10: Use this technique before stressful events.',
            createdAt: new Date()
        },
        {
            title: 'Butterfly Hug',
            description: 'Self-soothing technique that provides comfort and reduces nervous feelings.',
            category: 'nervousness',
            difficulty: 'easy',
            durationMinutes: 5,
            instructions: 'Step 1: Sit or stand comfortably.\nStep 2: Cross your arms over your chest.\nStep 3: Place your right hand on your left shoulder.\nStep 4: Place your left hand on your right shoulder.\nStep 5: Close your eyes and breathe naturally.\nStep 6: Gently tap your shoulders alternately, right then left.\nStep 7: Continue this butterfly pattern slowly and rhythmically.\nStep 8: Focus on the calming sensation.\nStep 9: Continue for 3-5 minutes or until you feel calmer.\nStep 10: Take three deep breaths before opening your eyes.',
            createdAt: new Date()
        },
        {
            title: 'Calm Place Visualization',
            description: 'Create and access a mental safe space to reduce nervousness and anxiety.',
            category: 'nervousness',
            difficulty: 'easy',
            durationMinutes: 10,
            instructions: 'Step 1: Find a quiet space and sit comfortably.\nStep 2: Close your eyes and take deep breaths.\nStep 3: Imagine a place where you feel completely safe and calm.\nStep 4: This could be real or imaginary - a beach, room, or garden.\nStep 5: Visualize every detail - colors, textures, and lighting.\nStep 6: Hear the sounds of this peaceful place.\nStep 7: Feel the sensations - temperature, textures, and comfort.\nStep 8: Notice how calm and safe you feel here.\nStep 9: Remember you can return to this place anytime.\nStep 10: Slowly open your eyes, carrying this calmness with you.',
            createdAt: new Date()
        },
        {
            title: 'Rhythmic Movement',
            description: 'Use gentle, repetitive movements to regulate the nervous system and reduce jitters.',
            category: 'nervousness',
            difficulty: 'easy',
            durationMinutes: 8,
            instructions: 'Step 1: Stand with feet shoulder-width apart.\nStep 2: Begin swaying gently side to side.\nStep 3: Let your arms swing naturally with the movement.\nStep 4: Keep the pace slow and steady.\nStep 5: Focus on the rhythm of your movement.\nStep 6: After 2 minutes, change to front-to-back rocking.\nStep 7: Rock gently on your feet, heel to toe.\nStep 8: Continue for 2 minutes.\nStep 9: Try gentle bouncing on your toes for 1 minute.\nStep 10: End by standing still and noticing how you feel calmer.',
            createdAt: new Date()
        }
    ];

    await db.insert(exercises).values(sampleExercises);
    
    console.log('✅ Exercises seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});