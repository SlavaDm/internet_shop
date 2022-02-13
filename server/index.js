import express from 'express';

import { createServer } from 'http';

import { Server } from 'socket.io';

import db from './sequelize.config.js';

import cors from 'cors';

import { COUNT_OF_THE_GOODS_ON_ONE_PAGE } from './constants.js';

import { admin } from './firebase.admin.js';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const httpServer = createServer(app);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Internet Shop',
      },
      servers: ['http://localhost:4000'],
    },
  },
  apis: ['index.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const io = new Server(httpServer, { cors: '*' });

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

db.sequelize.sync();

const Products = db.products;
const Users = db.users;
const Rooms = db.rooms;
const Messages = db.messages;
const FirebaseTokens = db.firebaseTokens;

/**
 * @swagger
 * /catalog/{id}:
 *   get:
 *     summary: Get good by id.
 *     description: Get good by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the good.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 */
app.get('/catalog/:id', async (req, res) => {
  const id = req.params.id;

  const obj = await Products.findOne({ where: { id: Number(id) } });

  res.json({ product: [obj] });
});

/**
 * @swagger
 * /catalog:
 *   post:
 *     summary: Create a new good.
 *     description: Create a new good.
 *     parameters:
 *       - in: body
 *         name: good
 *         required: true
 *         description: Create new good.
 *         schema:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               description: The type of the good.
 *               example: games
 *             name:
 *               type: string
 *               description: The name of the good.
 *               example: Far Cry 7
 *             description:
 *               type: string
 *               description: The new game.
 *               example: 1
 *             price:
 *               type: integer
 *               description: The price of the good.
 *               example: 5000
 *     responses:
 *       201:
 *         description: Object with message Created.
 */
app.post('/catalog', async (req, res) => {
  const { type, name, price, description } = req.body;

  await Products.create({
    type,
    name,
    price: Number(price),
    description,
  });
  res.status(201).json({ message: 'Created' });
});

/**
 * @swagger
 * /catalog/{id}:
 *   delete:
 *     summary: Delete good by id.
 *     description: Delete good by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the good.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Object with successful message.
 */
app.delete('/catalog/:id', async (req, res) => {
  const id = req.params.id;

  await Products.destroy({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({ message: 'Deleted' });
});

/**
 * @swagger
 * /catalog/{type}/count:
 *   get:
 *     summary: Get count of the goods with selected type.
 *     description: Get count of the goods with selected type. For example, clothes, games, bicycles.
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: type of the goods.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get object with count selected goods.
 */
app.get('/catalog/:type/count', async (req, res) => {
  const type = req.params.type;

  const count = await Products.count({ where: { type: type } });

  res.status(200).json({ count });
});

/**
 * @swagger
 * /catalog/{type}/{page}:
 *   get:
 *     summary: Get count of the goods with selected type and page.
 *     description: Get count of the goods with selected type and page. For example, clothes, games, bicycles as type.
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Type of the goods.
 *         schema:
 *           type: string
 *       - in: path
 *         name: page
 *         required: true
 *         description: Page of the goods.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get object with selected goods on selected page.
 */
app.get('/catalog/:type/:page', async (req, res) => {
  const type = req.params.type;

  const goods = await Products.findAll({
    offset: (Number(req.params.page) - 1) * COUNT_OF_THE_GOODS_ON_ONE_PAGE,
    limit: COUNT_OF_THE_GOODS_ON_ONE_PAGE,
    order: [['id', 'ASC']],
    where: {
      type: type,
    },
  });

  res.status(200).json({ goods });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get users.
 *     description: Get users.
 *     responses:
 *       200:
 *         description: Array with users.
 */
app.get('/users', async (req, res) => {
  const uid = req.params.uid;

  const users = await Users.findAll();

  res.status(200).json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user.
 *     description: Create new user.
 *     parameters:
 *       - in: body
 *         name: notification
 *         required: true
 *         description: type.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email of the user.
 *               example: k@gmail.com
 *             role:
 *               type: string
 *               description: The role of the user.
 *               example: user
 *             uid:
 *               type: string
 *               description: The uid of the user. U can't generate this value. It must to do firebase.
 *               example: hjwbghgwbuhqfwe
 *     responses:
 *       201:
 *         description: Object with message Created.
 */
app.post('/users', async (req, res) => {
  const { email, role, uid } = req.body;

  await Users.create({ email, role, uid });

  res.status(201).json({ message: 'Created' });
});

/**
 * @swagger
 * /users/{uid}:
 *   get:
 *     summary: Get user by uid.
 *     description: Get user by uid.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: Uid of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Object with array with object data about user.
 */
app.get('/users/:uid', async (req, res) => {
  const uid = req.params.uid;

  const user = await Users.findAll({
    where: {
      uid: uid,
    },
  });

  res.status(200).json({ user });
});

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get array with rooms.
 *     description: Get array with rooms.
 *     responses:
 *       200:
 *         description: Array with rooms.
 */
app.get('/rooms', async (req, res) => {
  const rooms = await Rooms.findAll();

  res.json(rooms);
});

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create new room.
 *     description: Create new room.
 *     parameters:
 *       - in: body
 *         name: rooms
 *         required: true
 *         description: type.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the room.
 *               example: 1001
 *     responses:
 *       201:
 *         description: Object with message Created and roomID.
 */
app.post('/rooms', async (req, res) => {
  const { name } = req.body;

  const data = await Rooms.create({ name });

  res.status(201).json({ message: 'Created', roomID: data.id });
});

/**
 * @swagger
 * /rooms/{roomID}:
 *   get:
 *     summary: Get room by roomID.
 *     description: Get room by roomID.
 *     parameters:
 *       - in: path
 *         name: roomID
 *         required: true
 *         description: RoomID of the rooms.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Object with array with object data about room.
 */
app.get('/rooms/:roomID', async (req, res) => {
  const roomID = req.params.roomID;

  const rooms = await Rooms.findAll({
    where: {
      id: roomID,
    },
  });

  res.status(200).json({ rooms });
});

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create new message.
 *     description: Create new message.
 *     parameters:
 *       - in: body
 *         name: messages
 *         required: true
 *         description: type.
 *         schema:
 *           type: object
 *           properties:
 *             roomID:
 *               type: integer
 *               description: The roomID for creating message.
 *               example: 34
 *             message:
 *               type: string
 *               description: The message for creating message.
 *               example: hey
 *             email:
 *               type: string
 *               description: The email of the user for creating message.
 *               example: admin@gmail.com
 *     responses:
 *       201:
 *         description: Object with message Created.
 */
app.post('/messages', async (req, res) => {
  const { roomID, message, email } = req.body;

  await Rooms.create({ room_id: roomID, message, email });

  res.status(201).json({ message: 'Created' });
});

/**
 * @swagger
 * /messages/{roomID}:
 *   get:
 *     summary: Get messages by roomID.
 *     description: Get messages by roomID.
 *     parameters:
 *       - in: path
 *         name: roomID
 *         required: true
 *         description: id of the rooms.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Object with array with object data about messages.
 */
app.get('/messages/:roomID', async (req, res) => {
  const roomID = req.params.roomID;

  const messages = await Messages.findAll({
    where: {
      room_id: roomID,
    },
  });

  res.json({ messages });
});

/**
 * @swagger
 * /firebase/notification:
 *   post:
 *     summary: Create notification about creating new post.
 *     description: Create notification about creating new post.
 *     parameters:
 *       - in: body
 *         name: notification
 *         required: true
 *         description: type.
 *         schema:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               description: The type of the good.
 *               example: games
 *             name:
 *               type: string
 *               description: The name of the good.
 *               example: Far Cry 7
 *             description:
 *               type: string
 *               description: The new game.
 *               example: 1
 *             price:
 *               type: integer
 *               description: The price of the good.
 *               example: 5000
 *     responses:
 *       200:
 *         description: Notification sent successfully.
 *       500:
 *         description: Server error.
 */
app.post('/firebase/notification', async (req, res) => {
  const { type, name, description, price } = req.body;

  const data = await FirebaseTokens.findAll();

  const tokens = data.map((el) => {
    return el.token;
  });

  const notification_options = {
    priority: 'high',
    timeToLive: 419200,
    collapseKey: 'do_not_collapse',
  };

  const payload = {
    notification: {
      title: 'Internet shop. New good!',
      body: `New good is here. Type: ${type}, Name: ${name}, Description: ${description}, Price: ${price}`,
      click_action: 'http://localhost:3000/',
      // icon: 'https://static.tildacdn.com/tild3062-6330-4835-a433-333966663263/2.png',
    },
  };

  const options = notification_options;

  admin
    .messaging()
    .sendToDevice(tokens, payload, options)
    .then((response) => {
      res.status(200).send('Notification sent successfully');
    })
    .catch((error) => {
      res.status(500).send('Server error');
    });
});

/**
 * @swagger
 * /firebase/tokens:
 *   get:
 *     summary: Get array with firebase tokens.
 *     description: Get array with firebase tokens. Tokens for send firebase notifications.
 *     responses:
 *       200:
 *         description: Array with firebase tokens.
 */
app.get('/firebase/tokens', async (req, res) => {
  const data = await FirebaseTokens.findAll();

  const tokens = data.map((el) => {
    return el.token;
  });

  res.status(200).json(tokens);
});

/**
 * @swagger
 * /firebase/tokens:
 *   put:
 *     summary: Create a JSONPlaceholder user.
 *     description: Get array with tokens.
 *     parameters:
 *       - in: body
 *         name: notification
 *         required: true
 *         description: type.
 *         schema:
 *           type: object
 *           properties:
 *             uid:
 *               type: string
 *               description: The roomID for creating message. U can't generate this value. It must to do firebase.
 *               example: wertwertwert
 *             token:
 *               type: string
 *               description: The new refreshed/created token.U can't generate this value. It must to do firebase.
 *               example: asdfsdafsa.sdfadfsadf.asdfasfd
 *     responses:
 *       201:
 *         description: Object with message Created.
 */
app.put('/firebase/tokens', async (req, res) => {
  const { uid, token } = req.body;

  const obj = await FirebaseTokens.findOne({ where: { uid } });

  if (obj) {
    await obj.update({ uid, token });

    res.json({ message: 'Updated' });
  } else {
    await FirebaseTokens.create({ uid, token });

    res.json({ message: 'Created' });
  }
});

io.on('connection', (socket) => {
  socket.on('JOIN', (room) => {
    socket.join(room);
  });

  socket.on('ROOM:NEW_MESSAGE', async ({ message, roomID, email }) => {
    socket.join(roomID);
    const creatingTime = Date.now();

    await Messages.create({
      room_id: Number(roomID),
      message: message,
      email: email,
      creating_time: creatingTime,
    });

    const result = await Messages.findAll({
      where: {
        creating_time: creatingTime,
      },
    });

    const id = result[0].id;

    io.sockets
      .to(roomID)
      .emit('message', { id, roomID, message, email, creatingTime });
  });
});

httpServer.listen(4000, () => {
  console.log('Server has been started on 4000 port');
});
