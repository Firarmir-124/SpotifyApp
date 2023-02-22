import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

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

  const [artist1, artist2] = await Artist.create(
    {
      title: 'Руки Вверх!',
      photo: 'fixtures/imagesArtist/artist1.jpeg',
      information: '«Руки Вверх!» — российская музыкальная поп-группа. До августа 2006 года состояла из Сергея Жукова и Алексея Потехина',
    },
    {
      title: 'JONY',
      photo: 'fixtures/imagesArtist/artist2.jpeg',
      information: 'Джахид Афраил оглы Гусейнли известный как JONY — певец и автор песен. Победитель второго сезона шоу «Маска» на НТВ',
    }
  );

  const [album1, album2, album3, album4] = await Album.create(
    {
      title: 'Сделай погромче!',
      executor: artist1._id,
      date: 1998,
      image: 'fixtures/imagesAlbums/album1.jpg',
    },
    {
      title: 'Дышите равномерно',
      executor: artist1._id,
      date: 1997,
      image: 'fixtures/imagesAlbums/album2.jpg',
    },
    {
      title: 'Список твоих мыслей',
      executor: artist2._id,
      date: 2019,
      image: 'fixtures/imagesAlbums/album3.jpg',
    },
    {
      title: 'Небесные розы',
      executor: artist2._id,
      date: 2020,
      image: 'fixtures/imagesAlbums/album4.jpg',
    }
  );

  await Track.create(
    {
      title: 'Я жду',
      album: album1._id,
      duration: '5 минут 2 секунды',
      trackNumber: 1
    },
    {
      title: 'История любви',
      album: album1._id,
      duration: '3 минут 57 секунды',
      trackNumber: 2
    },
    {
      title: 'Love Story (Club Mix)',
      album: album1._id,
      duration: '5 минут 2 секунды',
      trackNumber: 3
    },
    {
      title: 'Я жду',
      album: album1._id,
      duration: '4 минут 48 секунды',
      trackNumber: 4
    },
    {
      title: 'Здравствуй',
        album: album1._id,
      duration: '4 минут 55 секунды',
      trackNumber: 5
    },
    {
      title: 'Малыш',
      album: album2._id,
      duration: '3 минут 50 секунды',
      trackNumber: 1
    },
    {
      title: 'Последний поцелуй',
      album: album2._id,
      duration: '3 минут 53 секунды',
      trackNumber: 2
    },
    {
      title: 'Бандито',
      album: album2._id,
      duration: '2 минут 33 секунды',
      trackNumber: 3
    },
    {
      title: 'По кайфу',
      album: album2._id,
      duration: '3 минут 17 секунды',
      trackNumber: 4
    },
    {
      title: '1, 2, 3, 4, 5 (Gin Mix)',
      album: album2._id,
      duration: '5 минут 40 секунды',
      trackNumber: 5
    },
    {
      title: 'Доброе утро',
      album: album3._id,
      duration: '4 минут 08 секунды',
      trackNumber: 1
    },
    {
      title: 'Love Your Voice',
      album: album3._id,
      duration: '3 минут 2 секунды',
      trackNumber: 2
    },
    {
      title: 'Комета',
      album: album3._id,
      duration: '4 минут 5 секунды',
      trackNumber: 3
    },
    {
      title: 'Лали',
      album: album3._id,
      duration: '5 минут 1 секунды',
      trackNumber: 4
    },
    {
      title: 'Босс',
      album: album3._id,
      duration: '2 минут 2 секунды',
      trackNumber: 5
    },
    {
      title: 'Аллея',
      album: album4._id,
      duration: '3 минут 50 секунды',
      trackNumber: 1
    },
    {
      title: 'Без тебя я не я',
      album: album4._id,
      duration: '3 минут 20 секунды',
      trackNumber: 2
    },
    {
      title: 'Наверно, ты меня не помнишь',
      album: album4._id,
      duration: '4 минут 40 секунды',
      trackNumber: 3
    },
    {
      title: 'Титры',
      album: album4._id,
      duration: '5 минут 59 секунды',
      trackNumber: 4
    },
    {
      title: 'Никак',
      album: album4._id,
      duration: '1 минут 50 секунды',
      trackNumber: 5
    },
  );

  await db.close();
};

run().catch(console.error);