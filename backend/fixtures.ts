import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import * as crypto from "crypto";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;


  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, user2] = await User.create(
    {
      username: 'dima',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user'
    },
    {
      username: 'roma',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin'
    }
  );

  const [artist1, artist2, artist3] = await Artist.create(
    {
      title: 'Руки Вверх!',
      photo: 'fixtures/imagesArtist/artist1.jpg',
      information: '«Руки Вверх!» — российская музыкальная поп-группа. До августа 2006 года состояла из Сергея Жукова и Алексея Потехина',
      user: user1._id,
    },
    {
      title: 'JONY',
      photo: 'fixtures/imagesArtist/artist2.jpg',
      information: 'Джахид Афраил оглы Гусейнли известный как JONY — певец и автор песен. Победитель второго сезона шоу «Маска» на НТВ',
      user: user2._id,
    },
    {
      title: 'JONY_V2',
      photo: 'fixtures/imagesArtist/artist2.jpg',
      information: 'Джахид Афраил оглы Гусейнли известный как JONY — певец и автор песен. Победитель второго сезона шоу «Маска» на НТВ',
      user: user1._id,
      isPublished: false,
    }
  );

  const [album1, album2, album3, album4, album5] = await Album.create(
    {
      title: 'Сделай погромче!',
      executor: artist1._id,
      date: 1998,
      image: 'fixtures/imagesAlbums/album1.jpg',
      user: user1._id,
      isPublished: false,
    },
    {
      title: 'Дышите равномерно',
      executor: artist1._id,
      date: 1997,
      image: 'fixtures/imagesAlbums/album2.jpg',
      user: user1._id,
      isPublished: false,
    },
    {
      title: 'Список твоих мыслей',
      executor: artist2._id,
      date: 2019,
      image: 'fixtures/imagesAlbums/album3.jpg',
      user: user2._id,
      isPublished: false,
    },
    {
      title: 'Небесные розы',
      executor: artist2._id,
      date: 2020,
      image: 'fixtures/imagesAlbums/album4.jpg',
      user: user2._id,
      isPublished: false,
    },
    {
      title: 'Небесные розы_V2',
      executor: artist3._id,
      date: 2020,
      image: 'fixtures/imagesAlbums/album4.jpg',
      user: user1._id,
      isPublished: false,
    }
  );

  await Track.create(
    {
      title: 'Я жду',
      album: album1._id,
      duration: '5 минут 2 секунды',
      youtubeLink: "F1j6BBdWJqc",
      trackNumber: 1,
      user: user1._id,
    },
    {
      title: 'История любви',
      album: album1._id,
      duration: '3 минут 57 секунды',
      youtubeLink: "AKOTCO8CujY",
      trackNumber: 2,
      user: user1._id,
    },
    {
      title: 'Love Story (Club Mix)',
      album: album1._id,
      duration: '5 минут 2 секунды',
      youtubeLink: "CGDHP7yhsm4",
      trackNumber: 3,
      user: user1._id,
    },
    {
      title: 'Он тебя целует',
      album: album1._id,
      duration: '3 минут 32 секунды',
      youtubeLink: "phxQFEH51SE",
      trackNumber: 4,
      user: user1._id,
    },
    {
      title: 'Здравствуй',
        album: album1._id,
      duration: '4 минут 55 секунды',
      youtubeLink: "h7CQC5lmppc",
      trackNumber: 5,
      user: user1._id,
    },
    {
      title: 'Малыш',
      album: album2._id,
      duration: '3 минут 50 секунды',
      youtubeLink: "MuWQZyXrvaA",
      trackNumber: 1,
      user: user1._id,
    },
    {
      title: 'Последний поцелуй',
      album: album2._id,
      duration: '3 минут 53 секунды',
      youtubeLink: "2gBvOiOxCOg",
      trackNumber: 2,
      user: user1._id,
    },
    {
      title: 'Бандито',
      album: album2._id,
      duration: '2 минут 33 секунды',
      youtubeLink: "pEM5o5kR1ms",
      trackNumber: 3,
      user: user1._id,
    },
    {
      title: 'По кайфу',
      album: album2._id,
      duration: '3 минут 17 секунды',
      youtubeLink: "DVyacTfUo7E",
      trackNumber: 4,
      user: user1._id,
    },
    {
      title: '1, 2, 3, 4, 5 (Gin Mix)',
      album: album2._id,
      duration: '5 минут 40 секунды',
      youtubeLink: "Uw0nID45Hbw",
      trackNumber: 5,
      user: user1._id,
    },
    {
      title: 'Лали',
      album: album3._id,
      duration: '2 минут 28 секунды',
      youtubeLink: "SucUYI6Vnj0",
      trackNumber: 1,
      user: user2._id,
    },
    {
      title: 'Love Your Voice',
      album: album3._id,
      duration: '2 минут 30 секунды',
      youtubeLink: "https://youtu.be/m9ezpAUvMC8",
      trackNumber: 2,
      user: user2._id,
    },
    {
      title: 'Комета',
      album: album3._id,
      duration: '2 минут 39 секунды',
      youtubeLink: "yM1QjdoLmxQ",
      trackNumber: 3,
      user: user2._id,
    },
    {
      title: 'Титры',
      album: album3._id,
      duration: '3 минут 22 секунды',
      youtubeLink: "9Jr2dCEMxis",
      trackNumber: 4,
      user: user2._id,
    },
    {
      title: 'Босс',
      album: album3._id,
      duration: '3 минут 14 секунды',
      youtubeLink: "pJBgdXUwp28",
      trackNumber: 5,
      user: user2._id,
    },
    {
      title: 'Аллея',
      album: album4._id,
      duration: '2 минут 25 секунды',
      youtubeLink: "5R6BYT176Bk",
      trackNumber: 1,
      user: user2._id,
    },
    {
      title: 'Без тебя я не я',
      album: album4._id,
      duration: '3 минут 20 секунды',
      youtubeLink: "xtDQF0J6NjY",
      trackNumber: 2,
      user: user2._id,
    },
    {
      title: 'Наверно, ты меня не помнишь',
      album: album4._id,
      duration: '3 минут 07 секунды',
      youtubeLink: "Sh8Qz0JtVuY",
      trackNumber: 3,
      user: user2._id,
    },
    {
      title: 'Ты пари',
      album: album4._id,
      duration: '3 минут 55 секунды',
      youtubeLink: "pRp5RYkVyas",
      trackNumber: 4,
      user: user2._id,
    },
    {
      title: 'Никак',
      album: album4._id,
      duration: '4 минут 23 секунды',
      youtubeLink: "Lg2BJu8NHOU",
      trackNumber: 5,
      user: user2._id,
    },

    {
      title: 'Наверно, ты меня не помнишь_V2',
      album: album5._id,
      duration: '3 минут 07 секунды',
      youtubeLink: "Sh8Qz0JtVuY",
      trackNumber: 3,
      user: user2._id,
      isPublished: false,
    },
    {
      title: 'Ты пари_V2',
      album: album5._id,
      duration: '3 минут 55 секунды',
      youtubeLink: "pRp5RYkVyas",
      trackNumber: 4,
      user: user1._id,
      isPublished: false,
    },
    {
      title: 'Никак_V2',
      album: album5._id,
      duration: '4 минут 23 секунды',
      youtubeLink: "Lg2BJu8NHOU",
      trackNumber: 5,
      user: user2._id,
      isPublished: false,
    },
  );

  await db.close();
};

run().catch(console.error);