export interface SyncedLyric {
  time: number;
  text: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverImageUrl: string;
  audioUrl: string;
  explicit?: boolean;
  lyrics?: string;
  syncedLyrics?: SyncedLyric[]; // Tambah tipe lirik sinkron
}

export const tracks: Track[] = [
  {
    id: "1",
    title: "DtMF (Debí Tirar Más Fotos)",
    artist: "Bad Bunny",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    coverImageUrl: "/dtmf.jpg",
    audioUrl: "/dtmf.mp3",
    explicit: true,
    syncedLyrics: [
  { "time": 13.22, "text": "Eh-eh, eh-eh, eh-eh, eh-eh" },
  { "time": 18.14, "text": "Otro sunset bonito que veo en San Juan" },
  { "time": 22.46, "text": "Disfrutando de todas esas cosas que extrañan los que se van" },
  { "time": 26.69, "text": "Disfrutando de noches de esas" },
  { "time": 28.95, "text": "Que ya no se dan, que ya no se dan" },
  { "time": 32.86, "text": "Pero queriendo volver a la última vez" },
  { "time": 37.12, "text": "Que a los ojos te miré y contarte las cosas que no te conté" },
  { "time": 43.73, "text": "Y tirarte las fotos que no te tiré" },
  { "time": 49.38, "text": "Ey, tengo el pecho pelau, me di una mata" },
  { "time": 52.51, "text": "El corazón dándome patá'" },
  { "time": 54.58, "text": "Dime, baby, ¿dónde tú estás?" },
  { "time": 56.91, "text": "Pa' llegarle con Roro, Julito, Cristal" },
  { "time": 59.35, "text": "Roy, Edgar, Sebas, Oscar, Darnel y Big J tocando Batá" },
  { "time": 63.82, "text": "Hoy la calle la dejamos 'esbaratá'" },
  { "time": 66.99, "text": "Y sería cabrón que tú me toque' el güiro" },
  { "time": 70.32, "text": "Yo veo tu nombre y me salen suspiros" },
  { "time": 73.42, "text": "No sé si son petardos o si son tiros" },
  { "time": 77.67, "text": "Mi blanquita, perico, mi kilo" },
  { "time": 79.89, "text": "Yo estoy en PR tranquilo" },
  { "time": 82.22, "text": "Pero…" },
  { "time": 83.54, "text": "DeBÍ TiRAR MáS FOToS de cuando te tuve" },
  { "time": 87.72, "text": "Debí darte más besos y abrazos las veces que pude" },
  { "time": 93.88, "text": "Ey, ojalá que los míos nunca se muden" },
  { "time": 97.81, "text": "Y si hoy me emborracho, pues que me ayuden" },
  { "time": 100.49, "text": "DeBÍ TiRAR MáS FOToS de cuando te tuve" },
  { "time": 104.79, "text": "Debí darte lebih banyak besos y abrazos las veces que pude" },
  { "time": 111.62, "text": "Ojalá que los míos nunca se muden" },
  { "time": 115.84, "text": "Y si hoy me emborracho, pues que me ayuden" },
  { "time": 119.43, "text": "Ey, hoy voy a estar con abuelo to' el día" },
  { "time": 122.34, "text": "Jugando dominó" },
  { "time": 124.15, "text": "Si me pregunta si aún pienso en ti" },
  { "time": 126.49, "text": "Yo le digo que no" },
  { "time": 128.9, "text": "Que mi estadía cerquita de ti ya se terminó" },
  { "time": 133.06, "text": "Ya se terminó" },
  { "time": 134.31, "text": "Ey, que prendan las máquinas, voy pa' Santurce" },
  { "time": 138.2, "text": "Aquí todavía se da caña" },
  { "time": 140.02, "text": "Chequéate las babies, diablo, mami, qué dulce" },
  { "time": 143.57, "text": "Hoy yo quiero beber, beber, beber" },
  { "time": 149.37, "text": "Y hablar mierda hasta que me expulsen" },
  { "time": 152.29, "text": "Toi bien loco" },
  { "time": 154.42, "text": "Toi bien loco" },
  { "time": 156.4, "text": "Cabrón, guía tú, que hasta caminando yo toi que choco" },
  { "time": 160.88, "text": "Toi bien loco" },
  { "time": 162.95, "text": "Toi bien loco" },
  { "time": 165.0, "text": "Vamo' a disfrutar, que nunca se sabe si nos queda poco… DeBÍ TiRAR MáS F-" },
  { "time": 170.17, "text": "Gente, los quiero con cojones, los amo" },
  { "time": 173.06, "text": "Gracias por estar aquí, de verdad" },
  { "time": 175.48, "text": "Para mí es bien importante que estén aquí" },
  { "time": 177.31, "text": "Y cada uno de ustedes significa mucho para mí" },
  { "time": 180.03, "text": "Así que vamo' pa' la foto, vengan pa' acá" },
  { "time": 181.77, "text": "Métanse to' el mundo, to' el corillo, vamo'" },
  { "time": 184.14, "text": "Zumba" },
  { "time": 186.03, "text": "Ya Bernie tiene el nene y Jan la nena" },
  { "time": 189.32, "text": "Ya no estamos pa' las movie' y las cadenas" },
  { "time": 192.5, "text": "Estamos pa' las cosas que valgan la pena" },
  { "time": 195.86, "text": "Ey, pa'l perreo, la salsa, la bomba y la plena" },
  { "time": 199.77, "text": "Chequéate la mía cómo es que suena" },
  { "time": 202.45, "text": "DeBÍ TiRAR MáS FOToS de cuando te tuve" },
  { "time": 206.77, "text": "Debí darte más besos y abrazos las veces que pude" },
  { "time": 213.82, "text": "Ojalá yang los míos nunca se muden" },
  { "time": 217.74, "text": "Y que tú me envíes más nudes" },
  { "time": 226.2, "text": "Y si hoy me emborracho, que Beno me ayude" }
]
  },
  {
    id: "2",
    title: "Hiraeth",
    artist: "Sub Urban",
    album: "If Nevermore",
    coverImageUrl: "/virgil-hiraeth.jpg",
    audioUrl: "/virgil-hiraeth.mp3",
    explicit: false,
    lyrics: `[Verse 1]
I can't tell if it's you that I miss when
We're apart all I want is something green
In this city that I've never been in
How the air smells like times before you claim

[Chorus]
Oh-oh-oh was it always this way?
Oh-oh-oh did something change?
Oh-oh-oh was it always this way?
Oh you gave me your word I could give you
I'm losing my love, do I miss you?

[Verse 2]
And I said it once
Oh-oh, and I said it to you when we first
And I said it once
You were not
You were not my last
You were not
You were not my last
You were not
You were not my last
You were not

[Verse 3]
I can't tell if it's you that I miss when
We're apart, all you want is something vain
In this city that I've never been in
How the air smells like times before you claim

[Chorus]
Oh-oh-oh was it always this way?
Oh-oh-oh did something change?
Oh-oh-oh was it always this way?
Oh you gave me your word I could give you

[Verse 4]
In the tower on hill, reminiscent
You remind me of her, the lower you sink
To be nurtured in hiding, omniscient
Give a cell in the walls the more you drank

[Outro]
Oh-oh-oh calling my name
Oh-oh-oh you call my name
Oh-oh-oh are you calling my name?
Oh you gave me your word I could give you`
  },
  {
    id: "3",
    title: "wanna feel",
    artist: "Lil Mabu",
    album: "wanna feel",
    coverImageUrl: "/wanna feel.jpg",
    audioUrl: "/wanna feel.mp3",
    explicit: true,
    lyrics: `[Intro]
(Ah-ah-ah, ah-ah-ah)
Ah-ah, ah-ah-ah
Ah-ah-ah, ah-ah-ah
Ah-ah, ah-ah-ah
Ah-ah-ah, ah-ah-ah

[Chorus]
Something real, I wanna feel
It's been way too many years
I start to fear
That true love is nowhere near
I start to fear
I'll never find the one who heals
Me from every girl who disappeared
I wanna feel
I wanna feel (Feel, feel)
More than just a sex appeal
But something real
A vow that you cannot repeal
Strong as steel
I'll fuck you till you're crying tears
Bust on your face, make sure your skin is clear

[Verse]
I'll conceal all your flaws
I promise, bae, I wanna solve
Every problem you have from now on
'Cause you too pretty to be stressed at all, yeah
Just rest your mind, baby, I'll make the calls (I'll make the calls)
Damn, baby, I'll make the calls (That's a man's job)
Yeah, don't you be stressed at all (At all)
I'm the man of the house, yeah, I'm the one in charge
Just look pretty for me and be my Barbie doll

[Bridge]
You my trophy (Yeah, that's you)
Do I like you, or do I feel less lonely? (Around you)
Look in my face when I fuck you slowly, yeah (Slowly)
'Cause we ain't speak for a whole week, yeah
I got eyes for you only (And only you)
Whatever this is feels so holy (It really do)
Last one built me up then broke me, ha
Don't say you love me, baby, show me, yeah, me, yeah (Show me)

[Outro]
I wanna feel
I start to fear
I start to fear
Never find the one who heals
I wanna feel
But something real
Strong as steel`
  },
  {
    id: "4",
    title: "Ferrari",
    artist: "Krillz",
    album: "Single",
    coverImageUrl: "/ferrari.jpg",
    audioUrl: "/ferrari.mp3",
    explicit: true,
    syncedLyrics: [
  { time: 0.53, text: "Listen, look" },
  { time: 1.67, text: "Why do you think there's 2 seats in a ferrari?" },
  { time: 4.35, text: "There's snakes in the grass g" },
  { time: 5.63, text: "That's why I don't let sh*t slide" },
  { time: 6.97, text: "My circles tight like my baddies pun*ni" },
  { time: 8.89, text: "I got a thing for this caramel barbie" },
  { time: 10.37, text: "Hair curly just like she Kehlani" },
  { time: 12.50, text: "I'm hearing her ex don't like me" },
  { time: 13.73, text: "He knows I'm str*tching her out like Pilates" },
  { time: 15.45, text: "They used to hate now they wanna be mates" },
  { time: 16.92, text: "Better fix your face when I step in the party" },
  { time: 19.01, text: "I don't care if it's been 10 years" },
  { time: 20.39, text: "Any disrespect I ain't putting it past me" },
  { time: 22.35, text: "You can't chat to me about cake" },
  { time: 23.67, text: "I've got Mr Kipling but I ain't Ravi" },
  { time: 25.67, text: "I'm OT tryna fly these packs" },
  { time: 27.07, text: "But all these yatts wanna fly out to Bali" },
  { time: 28.81, text: "Fly out the country" },
  { time: 29.71, text: "Alla the barbies wanna have fun g" },
  { time: 31.57, text: "She found out what I'm making monthly" },
  { time: 32.89, text: "Her pum pums wet now she wanna f*ck me" },
  { time: 34.98, text: "If this shit went South like Putney" },
  { time: 36.29, text: "I know not one of them man would buss me" },
  { time: 38.50, text: "My loyalty's got no price" },
  { time: 39.60, text: "Can't speak for deres it's prolly on gumtree" },
  { time: 41.75, text: "I ain't really a fan of the hard food" },
  { time: 43.02, text: "Half of the shots just look like undies" },
  { time: 45.06, text: "More time shout me for the bud" },
  { time: 46.43, text: "Got the loudest stuff so my line gets jumpy" },
  { time: 48.32, text: "I turn bricks to stacks not walls" },
  { time: 49.71, text: "I ain't tryna fall off humpty dumpty" },
  { time: 51.71, text: "I don't cry when I take them L's" },
  { time: 53.09, text: "I pick up myself and start the recovery" },
  { time: 55.49, text: "Why do you think there's 2 seats in a ferrari?" },
  { time: 58.17, text: "There's snakes in the grass g" },
  { time: 59.35, text: "That's why I don't let sh*t slide" },
  { time: 60.67, text: "My circles tight like my baddies punani" },
  { time: 62.71, text: "I got a thing for this caramel barbie" },
  { time: 64.30, text: "Hair curly just like she Kehlani" },
  { time: 66.13, text: "I'm hearing her ex don't like me" },
  { time: 67.46, text: "He knows I'm str*tching her out like Pilates" },
  { time: 69.09, text: "I'm in a club with a couple of baddies" },
  { time: 70.79, text: "I don't even know which one imma take home" },
  { time: 72.77, text: "R Kelly just can't relate" },
  { time: 74.03, text: "When I'm tryna f*ck the gyal don't say no" },
  { time: 76.12, text: "You can't flex that you hit my ex" },
  { time: 77.48, text: "If I was the first to do it like draco" },
  { time: 79.41, text: "If we're finished I must be skittles" },
  { time: 80.71, text: "Oh why? Cah she's still tasting my rainbow" },
  { time: 82.39, text: "How you gonna diss if you ain't got peso's?" },
  { time: 84.99, text: "That don't make sense" },
  { time: 85.79, text: "It's like Dwayne Johnson tryna get canerows" },
  { time: 87.79, text: "I'm uptown with a bally on face" },
  { time: 89.21, text: "Cah shanks can still get backed on the main road" },
  { time: 90.77, text: "Yo DB, who's that in the astra?" },
  { time: 92.50, text: "Gotta watch out for the boys in plain clothes" },
  { time: 94.30, text: "Gotta watch out for the boys in blue" },
  { time: 95.71, text: "Why do you think there's 2 seats in a ferrari?" },
  { time: 98.31, text: "There's snakes in the grass g" },
  { time: 99.67, text: "That's why I don't let sh*t slide" },
  { time: 100.98, text: "My circles tight like my baddies pun*ni" },
  { time: 103.06, text: "I got a thing for this caramel barbie" },
  { time: 104.41, text: "Hair curly just like she Kehlani" },
  { time: 106.47, text: "I'm hearing her ex don't like me" },
  { time: 107.75, text: "He knows I'm str*tching her out like Pilates" },
  { time: 109.17, text: "Why do you think there's 2 seats in a ferrari?" },
  { time: 111.71, text: "There's snakes in the grass g" },
  { time: 113.06, text: "That's why I don't let sh*t slide" },
  { time: 114.35, text: "My circles tight like my baddies pun*ni" },
  { time: 116.35, text: "I got a thing for this caramel barbie" },
  { time: 117.81, text: "Hair curly just like she Kehlani" },
  { time: 119.78, text: "I'm hearing her ex don't like me" },
  { time: 121.21, text: "He knows I'm str*tching her out like Pilates" }
]
  },
  {
    id: "5",
    title: "ICEMAN FREESTYLE",
    artist: "Central Cee",
    album: "Single",
    coverImageUrl: "/icemanpristel.jpg",
    audioUrl: "/icemanpristel.mp3",
    explicit: true,
    syncedLyrics: [
  { time: 26.04, text: "My bro said he wanna get paid, okay, let's see what's possible" },
  { time: 29.15, text: "Popped a pill and now I feel alright, I believe I can fly, I feel unstoppable" },
  { time: 32.49, text: "I get flashbacks in my mind 'bout times we'd grind all night, it was horrible" },
  { time: 35.65, text: "It was flights and stairs, now I'm taking flights and arriving somewhere tropical" },
  { time: 38.81, text: "Man are calling my phone 'bout beef with my feet in the sand, that's a juxtaposition" },
  { time: 42.20, text: "He had a chain, but I didn't even know 'cos he came in the club with it tucked, it was hidden" },
  { time: 45.54, text: "I told man, \"If you wanna be great, be patient,\" but they still rush to the riches" },
  { time: 48.84, text: "And all of these guys with talk for the live yours gang would love to be in it" },
  { time: 52.25, text: "I state simple facts, should I lie 'cos the truth does hurt?" },
  { time: 55.36, text: "My ex wants me to ring her back, I missed your call, I'm on Do Not Disturb" },
  { time: 58.41, text: "I don't mind if they think it's cap, it's true, I don't wanna put them in the dirt" },
  { time: 61.63, text: "If you wanna talk to the kid, bring racks, it's cool if you don't, I don't wanna converse" },
  { time: 64.65, text: "Every time I get bagged, I gotta buy her a bag, so every other day, I gotta buy her a purse" },
  { time: 68.11, text: "Horses only, I don't drive Jags, you could tell it was me from the engine (Skr)" },
  { time: 71.29, text: "And I love sophisticated slags, petitist waist with the miniest skirt" },
  { time: 74.41, text: "Born to be rich, but I came from rags, she don't believe that I come from dirt" },
  { time: 77.59, text: "Could take you back to the exact traps, cats are still there, you would hear them pur" },
  { time: 80.87, text: "Give the green light to the gang, they'll crash, ring the alarm, see everyone purge" },
  { time: 84.01, text: "We don't spare no one, even mums and dads, if I give the command, see everyone hurt" },
  { time: 87.29, text: "" },
  { time: 87.50, text: "Where the fuck the function? Where the fuck is the function at?" },
  { time: 90.54, text: "Pull up to your party when everyone burst" },
  { time: 92.24, text: "Came in a wagon, I left in a—" },
  { time: 94.90, text: "Serious hate from the boys, they boil my blood" },
  { time: 96.92, text: "My gang consists of loyalest tugs" },
  { time: 98.64, text: "That bitch gotta go, she annoying as fuck" },
  { time: 100.18, text: "They're babies, throwing their toys out the pram" },
  { time: 101.71, text: "They're big man, but they still ain't grown up" },
  { time: 103.38, text: "" },
  { time: 104.85, text: "If your aim is getting me down, good luck" },
  { time: 108.12, text: "We're alive and well, and we're still on top" },
  { time: 111.60, text: "Sold out, but I still got more in stock" },
  { time: 114.77, text: "I don't see nobody else but us" },
  { time: 115.90, text: "If you wanna compete, put your best foot forward" },
  { time: 116.52, text: "" },
  { time: 118.08, text: "I look forward to it" },
  { time: 119.32, text: "I swear on my life, all the talk is boring" },
  { time: 121.25, text: "No, I ain't walking my strip, I'm touring" },
  { time: 122.84, text: "Back to the drawing board, I'm drawing" },
  { time: 124.40, text: "Back being single again, I'm whoring" },
  { time: 126.22, text: "Took a flight last night this morning, flying again, I'm soaring" },
  { time: 128.97, text: "I'm really at war, I just spun the car 'cos I thought that I saw him" },
  { time: 131.97, text: "I'm conflicted, beef is bad for business, money is more important" },
  { time: 135.60, text: "Got a bad bitch that'll make me fall in love then lure him" },
  { time: 138.70, text: "I'm tryna leave my man six foot under and fuck up his health insurance" },
  { time: 142.12, text: "I never wanted to be the boss, but fuck it, I'll play the position" },
  { time: 145.40, text: "We had the drop, but the young G aborted 'cos we weren't trained for the mission" },
  { time: 148.45, text: "I'm fucking a basketballer's wife, 'cos I'm paid like I play for the Pistons" },
  { time: 151.54, text: "I told bro if you see them crash it immediately and don't wait for permission" },
  { time: 154.72, text: "" },
  { time: 154.85, text: "I thought it was beef them boy there sweet, I ain't got real enemies" },
  { time: 158.20, text: "My bro still spread white stuff uptown like Philadelphia cheese" },
  { time: 161.65, text: "And he got dark like South Sundanese, no drought, still out in the B" },
  { time: 165.10, text: "Everything's gonna make sense in the end when we all get out of the streets" },
  { time: 168.40, text: "" }
]
  },
  {
    id: "6",
    title: "Skinny Loser",
    artist: "Sub Urban",
    album: "If Nevermore",
    coverImageUrl: "/skinnyloser.jpg",
    audioUrl: "/skinnyloser.mp3",
    explicit: true,
    lyrics: `[Intro]
(One, two, three, four)
One, two, three, four

[Chorus]
I'm such a loser
I've had enough
I've had enough
I'm such a loser
I've had enough
I've had enough, I've had enough

[Verse 1]
I'm sick of being less than
I wanna be the only painting in your home
Worship my image alone
But that's not realistic
I'm just another frail-looking boy
Not your first choice

[Pre-Chorus 1]
And if I could have the parts of you
You give to everybody but me
You know I could part with you
'Cause all you can give is your body
No, I cannot wait forever
Miss me when it turns September
When the leaves do fall is when
I know you won't find someone better
Till the winter thaws you out of my arms again
I won't let her go, I cannot wait forever
Miss me when it turns December

[Chorus]
I'm such a loser
I've had enough
I've had enough
I'm such a loser
I've had enough
I've had enough, I've had enough

[Verse 2]
I'm sick of being less than
I reside in my cage of filth
My love's so cheap
Take prescription pills to sleep
And it's not realistic
I'm just another faithless creative (Oh)
I can't commit

[Pre-Chorus 2]
And if I could escape from myself
I know I wouldn't take you with me
Make me feel like someone else
I hope you miss him when you kiss these lips
I cannot wait forever
Miss me when it turns September
When the leaves do fall is when
I know you won't find someone better
Till the winter thaws you out of my arms again
I won't let her go, I cannot wait forever
Miss me when it turns December

[Bridge]
So, I walked from that school, forgotten as a fool
Woke up when the sun set, there's cobwebs on his shoes
Trapped in my purgatory with nothing to lose
But my mind and my sense of time, rotting perfused

[Outro]
And I'd do it all again too
Barricade myself inside my own room
I don't wanna know who you've been kissing
I don't wanna know what I've been missing
And I'd do it all again too (Do it all again too)
Terrified of every girl I once knew (Every girl I once knew)
I don't wanna know who you've been kissing
(Know who you've been kissing)
I don't wanna know what I've been missing
(Know what I've been missing)`,
    syncedLyrics: [
      { time: 10.28, text: "One, two, three, four" },
      { time: 11.54, text: "I'm such a loser" },
      { time: 16.34, text: "I've had enough, I've had enough" },
      { time: 21.86, text: "I'm such a loser" },
      { time: 26.68, text: "I've had enough, I've had enough, I've had enough" },
      { time: 31.92, text: "" },
      { time: 33.18, text: "I'm sick of being less than" },
      { time: 35.74, text: "I wanna be the only painting in your home" },
      { time: 39.89, text: "Worship my image alone" },
      { time: 43.44, text: "But that's not realistic" },
      { time: 46.06, text: "I'm just another frail-looking boy" },
      { time: 50.54, text: "Not your first choice" },
      { time: 52.10, text: "" },
      { time: 52.50, text: "And if I could have the parts of you you give to everybody but me" },
      { time: 55.39, text: "You know I could part with you 'cause all you can give is your body" },
      { time: 58.00, text: "No, I cannot wait forever" },
      { time: 60.56, text: "Miss me when it turns September" },
      { time: 63.12, text: "When the leaves do fall is when I know you won't find someone better" },
      { time: 65.72, text: "Till the winter thaws you out of my arms again, I won't let her" },
      { time: 68.34, text: "Go, I cannot wait forever" },
      { time: 70.89, text: "Miss me when it turns December" },
      { time: 73.48, text: "I'm such a loser" },
      { time: 78.30, text: "I've had enough, I've had enough" },
      { time: 83.82, text: "I'm such a loser" },
      { time: 88.60, text: "I've had enough, I've had enough, I've had enough" },
      { time: 93.83, text: "" },
      { time: 95.10, text: "I'm sick of being less than" },
      { time: 97.68, text: "I reside in my cage of filth, my love's so cheap" },
      { time: 101.82, text: "Take prescription pills to sleep" },
      { time: 105.40, text: "And it's not realistic" },
      { time: 107.98, text: "I'm just another faithless creative" },
      { time: 112.49, text: "I can't commit" },
      { time: 113.78, text: "" },
      { time: 114.42, text: "And if I could escape from myself, I know I wouldn't take you with me" },
      { time: 117.34, text: "Make me feel like someone else, I hope you miss him when you kiss these lips" },
      { time: 120.22, text: "I cannot wait forever" },
      { time: 122.50, text: "Miss me when it turns September" },
      { time: 125.10, text: "When the leaves do fall is when I know you won't find someone better" },
      { time: 127.66, text: "Till the winter thaws you out of my arms again, I won't let her" },
      { time: 130.24, text: "Go, I cannot wait forever" },
      { time: 132.80, text: "Miss me when it turns December" },
      { time: 135.38, text: "" },
      { time: 145.82, text: "So, I walked from that school, forgotten as a fool" },
      { time: 148.54, text: "Woke up when the sun set, there's cobwebs on his shoes" },
      { time: 151.22, text: "Trapped in my purgatory with nothing to lose" },
      { time: 153.84, text: "But my mind and my sense of time, rotting perfused" },
      { time: 156.56, text: "And I'd do it all again, too" },
      { time: 158.82, text: "Barricade myself inside my own room" },
      { time: 161.39, text: "I don't wanna know who you've been kissing" },
      { time: 163.96, text: "I don't wanna know what I've been missing" },
      { time: 166.86, text: "And I'd do it all again, too (Do it all again, too)" },
      { time: 169.18, text: "Terrified of every girl I once knew (Every girl I once knew)" },
      { time: 171.77, text: "I don't wanna know who you've been kissing (Know who you've been kissing)" },
      { time: 174.34, text: "I don't wanna know what I've been missing (Know what I've been missing)" },
      { time: 177.52, text: "" }
    ]
  }
];