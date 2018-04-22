class Questionary {
    constructor() {
      throw new Error('AbstractClassError');
    }
  
    static getDATA(mentor) {
      return Questionary.DATA[mentor];
    }
  }
  
  Questionary.DATA = {
    alby: [
      {
        q: 'Nombra un juego que no tenga narrativa.',
        o: [
          'Pong',
          'Todos tienen.',
          'Déjame jugar!!',
          'Super Hexagon',
        ],
        c: 1,
      },
      {
        q: 'De estos 3 juegos, ¿cuál es el que tiene mayor narrativa?',
        o: [
          'Monkey Island',
          'Minecraft',
          'Dark Souls',
        ],
        c: 0,
      },
      {
        q: '¿Qué es más importante en un juego: la narrativa o la jugabilidad?',
        o: [
          'Jugabilidad, que no hayan bugs ni lag',
          'Narrativa',
          'Lo ideal es que ambas vayan a la par',
          'Que tenga muchos dlcs',
        ],
        c: 2,
      },
    ],
    sara: [
      {
        q: '¿Cómo se llama el compositor de Star Wars?',
        o: [
          'John Williams',
          'Dame chuches :3',
          'Danny Elfman',
        ],
        c: 0,
      },
      {
        q: '¿Cuál de estos juegos ha sido nominado a un grammy?',
        o: [
          'Last of us',
          'Journey',
          'Mass Effect',
        ],
        c: 1,
      },
      {
        q: '¿En qué reconocido juego se nos avisa de la llegada de un dragón con una potente música?',
        o: [
          'Elder Scrolls: Skyrim',
          'Dragon Age Origins',
          'Fall Out ',
        ],
        c: 0,
      },
    ],
    JP: [
      {
        q: '¿En cuántas horas teníamos que acabar el videojuego?',
        o: [
          '17',
          '¡Tenemos toda una vida para ello!',
          '16',
        ],
        c: 2,
      },
      {
        q: '¿Qué tipo de software o motor gráfico falló en su lanzamiento al mercado?',
        o: [
          'Unity',
          'Unreal Engine',
          'CryEngine',
        ],
        c: 2,
      },
      {
        q: '¿Cual es el ponente más atractivo de la Island Jam III?',
        o: [
          'Juan Pablo Ordoñez',
        ],
        c: 0,
      },
    ]
  };

  export default Questionary;
  