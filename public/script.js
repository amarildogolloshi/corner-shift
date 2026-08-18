const SIZE = 5;
const SLIDE_TIME = 180;
const EXIT_TIME = 180;
const DRAG_START_DISTANCE = 6;
const MOVE_COMMIT_DISTANCE = 25;

const boardElement = document.getElementById("board");
const newGameBtn = document.getElementById("newGameBtn");
const messageElement = document.getElementById("message");
const movesElement = document.getElementById("moves");
const leftElement = document.getElementById("left");
const patternSelect = document.getElementById("patternSelect");
const themeSelect = document.getElementById("themeSelect");

const THEMES = {
    classic: { redLabel: "", whiteLabel: "" },
    shapes: { redLabel: "", whiteLabel: "" },
    flower: { redLabel: "", whiteLabel: "" },
    animal: { redLabel: "", whiteLabel: "" },
    ocean: { redLabel: "", whiteLabel: "" },
    space: { redLabel: "", whiteLabel: "" },
    tetris: { redLabel: "", whiteLabel: "" },
    dinosaur: { redLabel: "", whiteLabel: "" },
    vehicle: { redLabel: "", whiteLabel: "" },
    sports: { redLabel: "", whiteLabel: "" },
    holiday: { redLabel: "", whiteLabel: "" },
    alphabet: { redLabel: "", whiteLabel: "" },
    number: { redLabel: "", whiteLabel: "" }
};

const PATTERN_TILE_LABELS = {
    heart: { redLabel: "♥", whiteLabel: "" },
    diamond: { redLabel: "◆", whiteLabel: "" },
    circle: { redLabel: "●", whiteLabel: "" },
    square: { redLabel: "■", whiteLabel: "" },
    triangle: { redLabel: "▲", whiteLabel: "" },
    hexagon: { redLabel: "⬢", whiteLabel: "" },
    plus: { redLabel: "+", whiteLabel: "" },
    flower: { redLabel: "🌸", whiteLabel: "" },
    garden: { redLabel: "🌿", whiteLabel: "" },
    petals: { redLabel: "🌼", whiteLabel: "" },
    cat: { redLabel: "🐱", whiteLabel: "" },
    paw: { redLabel: "🐾", whiteLabel: "" },
    butterfly: { redLabel: "🦋", whiteLabel: "" },
    bunny: { redLabel: "🐰", whiteLabel: "" },
    owl: { redLabel: "🦉", whiteLabel: "" },
    bear: { redLabel: "🐻", whiteLabel: "" },
    fox: { redLabel: "🦊", whiteLabel: "" },
    bee: { redLabel: "🐝", whiteLabel: "" },
    fish: { redLabel: "🐠", whiteLabel: "" },
    wave: { redLabel: "🌊", whiteLabel: "" },
    turtle: { redLabel: "🐢", whiteLabel: "" },
    star: { redLabel: "⭐", whiteLabel: "" },
    orbit: { redLabel: "🪐", whiteLabel: "" },
    rocket: { redLabel: "🚀", whiteLabel: "" },
    christmasTree: { redLabel: "🎄", whiteLabel: "" },
    snowflake: { redLabel: "❄️", whiteLabel: "" },
    pumpkin: { redLabel: "🎃", whiteLabel: "" },
    easterEgg: { redLabel: "🥚", whiteLabel: "" },
    trex: { redLabel: "🦖", whiteLabel: "" },
    triceratops: { redLabel: "🦕", whiteLabel: "" },
    dinoFootprint: { redLabel: "🐾", whiteLabel: "" },
    dinoEgg: { redLabel: "🥚", whiteLabel: "" },
    car: { redLabel: "🚗", whiteLabel: "" },
    truck: { redLabel: "🚚", whiteLabel: "" },
    airplane: { redLabel: "✈️", whiteLabel: "" },
    vehicleRocket: { redLabel: "🚀", whiteLabel: "" },
    soccer: { redLabel: "⚽", whiteLabel: "" },
    basketball: { redLabel: "🏀", whiteLabel: "" },
    baseball: { redLabel: "⚾", whiteLabel: "" },
    football: { redLabel: "🏈", whiteLabel: "" }
};


const THEME_PATTERNS = {
    classic: ["checker", "stripes", "border", "columns", "random"],
    shapes: ["heart", "diamond", "circle", "square", "triangle", "hexagon", "plus"],
    flower: ["flower", "garden", "petals"],
    animal: ["cat", "paw", "butterfly", "bunny", "owl", "bear", "fox", "bee"],
    ocean: ["fish", "wave", "turtle"],
    space: ["star", "orbit", "rocket"],
    tetris: ["tetrisMix"],
    dinosaur: ["trex", "triceratops", "dinoFootprint", "dinoEgg"],
    vehicle: ["car", "truck", "airplane", "vehicleRocket"],
    sports: ["soccer", "basketball", "baseball", "football"],
    holiday: ["christmasTree", "snowflake", "pumpkin", "easterEgg"],
    alphabet: ['letterA', 'letterB', 'letterC', 'letterD', 'letterE', 'letterF', 'letterG', 'letterH', 'letterI', 'letterJ', 'letterK', 'letterL', 'letterM', 'letterN', 'letterO', 'letterP', 'letterQ', 'letterR', 'letterS', 'letterT', 'letterU', 'letterV', 'letterW', 'letterX', 'letterY', 'letterZ'],
    number: ['number0', 'number1', 'number2', 'number3', 'number4', 'number5', 'number6', 'number7', 'number8', 'number9']
};

const PATTERN_LABELS = {
    checker: "Checker",
    stripes: "Stripes",
    border: "Border",
    columns: "Columns",
    heart: "Heart",
    diamond: "Diamond",
    circle: "Circle",
    square: "Square",
    triangle: "Triangle",
    hexagon: "Hexagon",
    plus: "Plus",
    rings: "Rings",
    flower: "Flower",
    garden: "Garden",
    petals: "Petals",
    cat: "Cat Face",
    paw: "Paw Print",
    butterfly: "Butterfly",
    bunny: "Bunny Face",
    owl: "Owl Face",
    bear: "Bear Face",
    fox: "Fox Face",
    bee: "Bee",
    fish: "Fish",
    wave: "Wave",
    turtle: "Turtle",
    star: "Star",
    orbit: "Orbit",
    rocket: "Rocket",
    tetrisMix: "Tetris Mix",
    tetrisIRed: "Tetris I Red",
    tetrisIWhite: "Tetris I White",
    tetrisTRed: "Tetris T Red",
    tetrisTWhite: "Tetris T White",
    tetrisLRed: "Tetris L Red",
    tetrisLWhite: "Tetris L White",
    tetrisSRed: "Tetris S Red",
    tetrisSWhite: "Tetris S White",
    tetrisORed: "Tetris O Red",
    tetrisOWhite: "Tetris O White",
    tetrisI: "Tetris I Piece",
    tetrisT: "Tetris T Piece",
    tetrisL: "Tetris L Piece",
    tetrisS: "Tetris S Piece",
    tetrisO: "Tetris O Piece",
    trex: "T-Rex",
    triceratops: "Triceratops",
    dinoFootprint: "Footprint",
    dinoEgg: "Egg",
    car: "Car",
    truck: "Truck",
    airplane: "Airplane",
    vehicleRocket: "Rocket",
    soccer: "Soccer Ball",
    basketball: "Basketball",
    baseball: "Baseball",
    football: "Football",
    christmasTree: "Christmas Tree",
    snowflake: "Snowflake",
    pumpkin: "Pumpkin",
    easterEgg: "Easter Egg",
    letterA: "A",
    letterB: "B",
    letterC: "C",
    letterD: "D",
    letterE: "E",
    letterF: "F",
    letterG: "G",
    letterH: "H",
    letterI: "I",
    letterJ: "J",
    letterK: "K",
    letterL: "L",
    letterM: "M",
    letterN: "N",
    letterO: "O",
    letterP: "P",
    letterQ: "Q",
    letterR: "R",
    letterS: "S",
    letterT: "T",
    letterU: "U",
    letterV: "V",
    letterW: "W",
    letterX: "X",
    letterY: "Y",
    letterZ: "Z",
    number0: "0",
    number1: "1",
    number2: "2",
    number3: "3",
    number4: "4",
    number5: "5",
    number6: "6",
    number7: "7",
    number8: "8",
    number9: "9",
    random: "Random"
};

const BOARD_PATTERNS = {
    checker: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "red"]
    ],
    stripes: [
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "white"]
    ],
    border: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    columns: [
        ["red", "white", "red", "white", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "white", "red", "white", "white"]
    ],
    heart: [
        ["red", "white", "red", "white", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"]
    ],
    diamond: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    rings: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    circle: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    square: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    triangle: [
        ["red", "white", "red", "white", "red"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"]
    ],
    hexagon: [
        ["red", "red", "red", "white", "red"],
        ["red", "white", "white", "red", "red"],
        ["red", "white", "white", "red", "red"],
        ["red", "white", "white", "red", "red"],
        ["red", "red", "red", "white", "white"]
    ],
    plus: [
        ["red", "white", "red", "white", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    flower: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"]
    ],
    garden: [
        ["red", "white", "red", "white", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "red", "white", "red", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    petals: [
        ["red", "red", "white", "red", "red"],
        ["red", "white", "red", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "red"],
        ["red", "red", "white", "red", "white"]
    ],
    cat: [
        ["red", "white", "white", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    paw: [
        ["red", "red", "white", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["white", "red", "red", "red", "white"]
    ],
    butterfly: [
        ["red", "white", "white", "white", "red"],
        ["red", "red", "white", "red", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "red", "white", "red", "red"],
        ["red", "white", "white", "white", "white"]
    ],
    fish: [
        ["red", "white", "red", "red", "white"],
        ["white", "red", "red", "red", "red"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "red"],
        ["red", "white", "red", "red", "white"]
    ],
    wave: [
        ["red", "white", "white", "red", "red"],
        ["white", "red", "white", "white", "red"],
        ["red", "white", "red", "white", "white"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    turtle: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    star: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    orbit: [
        ["red", "red", "white", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "white", "red", "white"]
    ],
    rocket: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    tetrisMix: [
        ["red", "red", "white", "white", "white"],
        ["red", "red", "white", "red", "white"],
        ["white", "white", "white", "red", "red"],
        ["red", "white", "red", "red", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    tetrisIRed: [
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["white", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"]
    ],
    tetrisIWhite: [
        ["red", "red", "red", "red", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "red"],
        ["red", "red", "red", "red", "red"]
    ],
    tetrisTRed: [
        ["white", "white", "white", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"]
    ],
    tetrisTWhite: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "white", "red", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "red", "red", "red", "red"]
    ],
    tetrisLRed: [
        ["white", "white", "white", "white", "white"],
        ["white", "red", "white", "white", "white"],
        ["white", "red", "white", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "white", "white", "white"]
    ],
    tetrisLWhite: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "red", "red", "red"],
        ["red", "white", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "red"]
    ],
    tetrisSRed: [
        ["white", "white", "white", "white", "white"],
        ["white", "white", "red", "red", "white"],
        ["white", "red", "red", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"]
    ],
    tetrisSWhite: [
        ["red", "red", "red", "red", "red"],
        ["red", "red", "white", "white", "red"],
        ["red", "white", "white", "red", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "red", "red", "red", "red"]
    ],
    tetrisORed: [
        ["white", "white", "white", "white", "white"],
        ["white", "red", "red", "white", "white"],
        ["white", "red", "red", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"]
    ],
    tetrisOWhite: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "red", "red"],
        ["red", "white", "white", "red", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "red", "red", "red", "red"]
    ],
    tetrisI: [
        ["red", "white", "white", "white", "red"],
        ["white", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    tetrisT: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    tetrisL: [
        ["red", "red", "white", "white", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "white", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    tetrisS: [
        ["red", "white", "white", "white", "red"],
        ["white", "white", "red", "red", "white"],
        ["white", "red", "red", "white", "white"],
        ["white", "white", "red", "red", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    tetrisO: [
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "white", "white"],
        ["white", "red", "red", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    bunny: [
        ["red", "red", "white", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    owl: [
        ["red", "red", "white", "red", "red"],
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    bear: [
        ["red", "white", "red", "white", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "white"]
    ],
    fox: [
        ["red", "white", "white", "white", "red"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    bee: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    trex: [
        ["red", "red", "red", "white", "red"],
        ["red", "white", "red", "red", "white"],
        ["red", "red", "red", "white", "white"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    triceratops: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    dinoFootprint: [
        ["red", "white", "red", "white", "red"],
        ["white", "white", "white", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    dinoEgg: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"]
    ],
    car: [
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    truck: [
        ["red", "red", "red", "white", "red"],
        ["red", "white", "red", "red", "red"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    airplane: [
        ["red", "white", "red", "white", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "red", "white", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    vehicleRocket: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    soccer: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    basketball: [
        ["red", "red", "white", "red", "red"],
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "red"],
        ["red", "red", "white", "red", "white"]
    ],
    baseball: [
        ["red", "white", "white", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    football: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "white", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    christmasTree: [
        ["red", "white", "red", "white", "red"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "red", "white", "white"]
    ],
    snowflake: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "red", "white", "white"]
    ],
    pumpkin: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "red", "red", "white"]
    ],
    easterEgg: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "red", "white", "white"]
    ],
    letterA: [
        ["red", "white", "red", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "white"]
    ],
    letterB: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    letterC: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "white"]
    ],
    letterS: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    number1: [
        ["red", "white", "red", "white", "red"],
        ["white", "red", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["red", "red", "red", "red", "white"]
    ],
    number2: [
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "white"]
    ],
    number3: [
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    number5: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    letterA: [
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"]
    ],
    letterB: [
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    letterC: [
        ["white", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["white", "red", "red", "red", "red"]
    ],
    letterD: [
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    letterE: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "red"]
    ],
    letterF: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    letterG: [
        ["white", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "red"]
    ],
    letterH: [
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"]
    ],
    letterI: [
        ["red", "red", "red", "red", "red"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["red", "red", "red", "red", "red"]
    ],
    letterJ: [
        ["white", "white", "red", "red", "red"],
        ["white", "white", "white", "red", "white"],
        ["white", "white", "white", "red", "white"],
        ["red", "white", "white", "red", "white"],
        ["white", "red", "red", "white", "white"]
    ],
    letterK: [
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "red", "white"],
        ["red", "red", "red", "white", "white"],
        ["red", "white", "white", "red", "white"],
        ["red", "white", "white", "white", "red"]
    ],
    letterL: [
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "red"]
    ],
    letterM: [
        ["red", "white", "white", "white", "red"],
        ["red", "red", "white", "red", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"]
    ],
    letterN: [
        ["red", "white", "white", "white", "red"],
        ["red", "red", "white", "white", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "white", "white", "red", "red"],
        ["red", "white", "white", "white", "red"]
    ],
    letterO: [
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"]
    ],
    letterP: [
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "white"],
        ["red", "white", "white", "white", "white"]
    ],
    letterQ: [
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "red", "red"],
        ["white", "red", "red", "red", "red"]
    ],
    letterR: [
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "red", "white"],
        ["red", "white", "white", "white", "red"]
    ],
    letterS: [
        ["white", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    letterT: [
        ["red", "red", "red", "red", "red"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"]
    ],
    letterU: [
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"]
    ],
    letterV: [
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["white", "white", "red", "white", "white"]
    ],
    letterW: [
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "red", "white", "red"],
        ["red", "red", "white", "red", "red"],
        ["red", "white", "white", "white", "red"]
    ],
    letterX: [
        ["red", "white", "white", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "white", "red", "white"],
        ["red", "white", "white", "white", "red"]
    ],
    letterY: [
        ["red", "white", "white", "white", "red"],
        ["white", "red", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"]
    ],
    letterZ: [
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "white", "white", "white"],
        ["red", "red", "red", "red", "red"]
    ],
    number0: [
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"]
    ],
    number1: [
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "red", "red", "white"]
    ],
    number2: [
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["white", "white", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["red", "red", "red", "red", "red"]
    ],
    number3: [
        ["red", "red", "red", "red", "white"],
        ["white", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    number4: [
        ["red", "white", "white", "white", "red"],
        ["red", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "red"],
        ["white", "white", "white", "white", "red"]
    ],
    number5: [
        ["red", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "white"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ],
    number6: [
        ["white", "red", "red", "red", "red"],
        ["red", "white", "white", "white", "white"],
        ["red", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"]
    ],
    number7: [
        ["red", "red", "red", "red", "red"],
        ["white", "white", "white", "red", "white"],
        ["white", "white", "red", "white", "white"],
        ["white", "red", "white", "white", "white"],
        ["white", "red", "white", "white", "white"]
    ],
    number8: [
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "white"]
    ],
    number9: [
        ["white", "red", "red", "red", "white"],
        ["red", "white", "white", "white", "red"],
        ["white", "red", "red", "red", "red"],
        ["white", "white", "white", "white", "red"],
        ["red", "red", "red", "red", "white"]
    ]
};

let board = [];
let selected = null;
let moves = 0;
let isAnimating = false;
let redExitSide = "top";
let whiteExitSide = "bottom";
let pointerStart = null;
let draggingTile = null;
let dragFrom = null;
let hasDragged = false;

function randomColor() {
    return Math.random() < 0.5 ? "red" : "white";
}

function randomExitSides() {
    redExitSide = Math.random() < 0.5 ? "top" : "left";
    whiteExitSide = Math.random() < 0.5 ? "bottom" : "right";
}

function updateTheme() {
    const theme = getCurrentThemeName();
    document.body.className = `theme-${theme}`;
}

function populatePatternOptions() {
    if (!patternSelect) return;

    const theme = getCurrentThemeName();
    const patterns = THEME_PATTERNS[theme] || THEME_PATTERNS.classic;

    patternSelect.innerHTML = "";

    patterns.forEach(function (patternName) {
        const option = document.createElement("option");
        option.value = patternName;
        option.textContent = PATTERN_LABELS[patternName] || patternName;
        patternSelect.appendChild(option);
    });

    patternSelect.value = patterns[0];
}

function updateGateClasses() {
    boardElement.classList.remove("red-gate-top", "red-gate-left", "white-gate-bottom", "white-gate-right");
    boardElement.classList.add(`red-gate-${redExitSide}`);
    boardElement.classList.add(`white-gate-${whiteExitSide}`);
}

function createBoard() {
    board = [];
    randomExitSides();
    updateTheme();
    updateGateClasses();

    const selectedPattern = patternSelect ? patternSelect.value : "checker";

    if (selectedPattern !== "random" && BOARD_PATTERNS[selectedPattern]) {
        board = clonePattern(BOARD_PATTERNS[selectedPattern]);
    } else {
        for (let row = 0; row < SIZE; row++) {
            board[row] = [];
            for (let col = 0; col < SIZE; col++) {
                board[row][col] = randomColor();
            }
        }
    }

    board[0][0] = "red";
    board[SIZE - 1][SIZE - 1] = "white";

    selected = null;
    moves = 0;
    isAnimating = false;
    pointerStart = null;
    draggingTile = null;
    dragFrom = null;
    hasDragged = false;

    setMessage("");
    render();
}

function clonePattern(pattern) {
    return pattern.map(function (row) {
        return row.slice();
    });
}

function render() {
    boardElement.innerHTML = "";
    let tilesLeft = 0;
    const tileLabels = getCurrentTileLabels();

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = String(row);
            cell.dataset.col = String(col);

            if (row === 0 && col === 0) cell.classList.add("red-corner");
            if (row === SIZE - 1 && col === SIZE - 1) cell.classList.add("white-corner");
            if (!board[row][col]) cell.classList.add("empty-space");

            const color = board[row][col];
            if (color) {
                tilesLeft++;
                const tile = document.createElement("div");
                tile.className = `tile ${color}`;
                tile.dataset.row = String(row);
                tile.dataset.col = String(col);

                const label = document.createElement("span");
                label.className = "tile-label";
                label.textContent = color === "red" ? tileLabels.redLabel : tileLabels.whiteLabel;
                tile.appendChild(label);

                if (selected && selected.row === row && selected.col === col) {
                    tile.classList.add("selected");
                }

                tile.addEventListener("pointerdown", handlePointerDown);
                tile.addEventListener("pointermove", handlePointerMove);
                tile.addEventListener("pointerup", handlePointerUp);
                tile.addEventListener("pointercancel", cancelDrag);
                tile.addEventListener("lostpointercapture", cancelDrag);
                cell.appendChild(tile);
            }

            cell.addEventListener("pointerup", function () {
                handleEmptyCellTap(row, col);
            });

            boardElement.appendChild(cell);
        }
    }

    updateStats(tilesLeft);
    if (tilesLeft === 0) setMessage(`You cleared the board in ${moves} moves!`);
}

function getCurrentThemeName() {
    return themeSelect ? themeSelect.value : "classic";
}

function getCurrentPatternName() {
    return patternSelect ? patternSelect.value : "";
}

function getCurrentTileLabels() {
    const patternName = getCurrentPatternName();
    if (PATTERN_TILE_LABELS[patternName]) {
        return PATTERN_TILE_LABELS[patternName];
    }

    return THEMES[getCurrentThemeName()] || THEMES.classic;
}

function handlePointerDown(event) {
    if (isAnimating) return;
    const tile = event.currentTarget;
    if (tile.setPointerCapture) tile.setPointerCapture(event.pointerId);
    pointerStart = { x: event.clientX, y: event.clientY };
    dragFrom = { row: Number(tile.dataset.row), col: Number(tile.dataset.col) };
    draggingTile = tile;
    hasDragged = false;
}

function handlePointerMove(event) {
    if (isAnimating) return;
    if (!pointerStart || !draggingTile || !dragFrom) return;

    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < DRAG_START_DISTANCE) return;

    const directExit = getDirectGateLineExit(dx, dy, dragFrom.row, dragFrom.col);
    if (directExit) {
        hasDragged = true;
        draggingTile.classList.add("dragging");
        moveTileVisually(dx, dy, true, directExit.stepsToExit);
        clearDropTargets();
        return;
    }

    const slideTarget = getSlideTargetFromDrag(dx, dy, dragFrom.row, dragFrom.col);
    if (!slideTarget) {
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
        clearDropTargets();
        return;
    }

    hasDragged = true;
    draggingTile.classList.add("dragging");
    moveTileVisually(dx, dy, false, slideTarget.steps);
    highlightDropTarget(slideTarget.row, slideTarget.col);
}

function handlePointerUp(event) {
    if (isAnimating) {
        cancelDrag();
        return;
    }

    if (!pointerStart || !draggingTile || !dragFrom) {
        cancelDrag();
        return;
    }

    event.stopPropagation();

    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    clearDropTargets();

    if (!hasDragged || Math.max(absX, absY) < MOVE_COMMIT_DISTANCE) {
        resetDraggedTile();
        selected = { row: dragFrom.row, col: dragFrom.col };
        clearPointerState();
        render();
        return;
    }

    const directExit = getDirectGateLineExit(dx, dy, dragFrom.row, dragFrom.col);
    if (directExit) {
        const fromRow = dragFrom.row;
        const fromCol = dragFrom.col;
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
        clearPointerState();
        animateExit(fromRow, fromCol, directExit.exitRow, directExit.exitCol);
        return;
    }

    const slideTarget = getSlideTargetFromDrag(dx, dy, dragFrom.row, dragFrom.col);
    if (slideTarget) {
        const fromRow = dragFrom.row;
        const fromCol = dragFrom.col;
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
        clearPointerState();
        animateMove(fromRow, fromCol, slideTarget.row, slideTarget.col);
    } else {
        resetDraggedTile();
        clearPointerState();
    }
}

function handleEmptyCellTap(row, col) {
    if (isAnimating) return;
    if (board[row][col]) return;
    if (!selected) return;
    tryMove(selected.row, selected.col, row, col);
}

function tryMove(fromRow, fromCol, toRow, toCol) {
    if (!canMove(fromRow, fromCol, toRow, toCol)) return;
    animateMove(fromRow, fromCol, toRow, toCol);
}

function canMove(fromRow, fromCol, toRow, toCol) {
    if (!isInsideBoard(fromRow, fromCol)) return false;
    if (!isInsideBoard(toRow, toCol)) return false;
    if (!board[fromRow][fromCol]) return false;
    if (board[toRow][toCol]) return false;
    if (fromRow !== toRow && fromCol !== toCol) return false;
    if (fromRow === toRow && fromCol === toCol) return false;
    return isPathClear(fromRow, fromCol, toRow, toCol);
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
    const rowStep = Math.sign(toRow - fromRow);
    const colStep = Math.sign(toCol - fromCol);
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
        if (board[currentRow][currentCol]) return false;
        currentRow += rowStep;
        currentCol += colStep;
    }

    return !board[toRow][toCol];
}

function getDirectGateLineExit(dx, dy, startRow, startCol) {
    const direction = getDirectionFromDrag(dx, dy);
    const color = board[startRow][startCol];
    if (!color) return null;

    let corner = null;
    let exit = null;
    let requiredDirection = null;

    if (color === "red") {
        corner = { row: 0, col: 0 };
        exit = getManualExitTarget(corner.row, corner.col, color);
        requiredDirection = redExitSide === "top" ? { rowStep: -1, colStep: 0, axis: "y" } : { rowStep: 0, colStep: -1, axis: "x" };
    }

    if (color === "white" || color === "black") {
        corner = { row: SIZE - 1, col: SIZE - 1 };
        exit = getManualExitTarget(corner.row, corner.col, color);
        requiredDirection = whiteExitSide === "bottom" ? { rowStep: 1, colStep: 0, axis: "y" } : { rowStep: 0, colStep: 1, axis: "x" };
    }

    if (!corner || !exit || !requiredDirection) return null;

    if (direction.rowStep !== requiredDirection.rowStep || direction.colStep !== requiredDirection.colStep) return null;
    if (!isAlignedWithGateLine(startRow, startCol, corner.row, corner.col, requiredDirection)) return null;
    if (!isPathToCornerClearForExit(startRow, startCol, corner.row, corner.col)) return null;

    const stepsToCorner = Math.abs(startRow - corner.row) + Math.abs(startCol - corner.col);

    return {
        cornerRow: corner.row,
        cornerCol: corner.col,
        exitRow: exit.row,
        exitCol: exit.col,
        stepsToExit: stepsToCorner + 1
    };
}

function isAlignedWithGateLine(startRow, startCol, cornerRow, cornerCol, direction) {
    if (direction.axis === "y") return startCol === cornerCol;
    return startRow === cornerRow;
}

function isPathToCornerClearForExit(fromRow, fromCol, cornerRow, cornerCol) {
    if (fromRow !== cornerRow && fromCol !== cornerCol) return false;
    if (fromRow === cornerRow && fromCol === cornerCol) return true;

    const rowStep = Math.sign(cornerRow - fromRow);
    const colStep = Math.sign(cornerCol - fromCol);
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== cornerRow || currentCol !== cornerCol) {
        if (board[currentRow][currentCol]) return false;
        currentRow += rowStep;
        currentCol += colStep;
    }

    return !board[cornerRow][cornerCol];
}

function getSlideTargetFromDrag(dx, dy, startRow, startCol) {
    const direction = getDirectionFromDrag(dx, dy);
    const maxEmptySteps = getMaxEmptySteps(startRow, startCol, direction.rowStep, direction.colStep);
    if (maxEmptySteps === 0) return null;

    const cellDistance = getCellMoveDistance();
    const dragDistance = direction.axis === "x" ? Math.abs(dx) : Math.abs(dy);
    const requestedSteps = Math.max(1, Math.round(dragDistance / cellDistance));
    const steps = Math.min(requestedSteps, maxEmptySteps);

    return {
        row: startRow + direction.rowStep * steps,
        col: startCol + direction.colStep * steps,
        steps
    };
}

function getMaxEmptySteps(startRow, startCol, rowStep, colStep) {
    let steps = 0;
    let row = startRow + rowStep;
    let col = startCol + colStep;

    while (isInsideBoard(row, col) && !board[row][col]) {
        steps++;
        row += rowStep;
        col += colStep;
    }

    return steps;
}

function getDirectionFromDrag(dx, dy) {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX > absY) {
        return { rowStep: 0, colStep: dx > 0 ? 1 : -1, axis: "x" };
    }

    return { rowStep: dy > 0 ? 1 : -1, colStep: 0, axis: "y" };
}

function getManualExitTarget(row, col, color) {
    if (color === "red" && row === 0 && col === 0) {
        if (redExitSide === "top") return { row: -1, col: 0 };
        if (redExitSide === "left") return { row: 0, col: -1 };
    }

    if ((color === "white" || color === "black") && row === SIZE - 1 && col === SIZE - 1) {
        if (whiteExitSide === "bottom") return { row: SIZE, col: SIZE - 1 };
        if (whiteExitSide === "right") return { row: SIZE - 1, col: SIZE };
    }

    return null;
}

function isInsideBoard(row, col) {
    return row >= 0 && row < SIZE && col >= 0 && col < SIZE;
}

function animateMove(fromRow, fromCol, toRow, toCol) {
    if (isAnimating) return;
    isAnimating = true;

    const tile = document.querySelector(`.tile[data-row="${fromRow}"][data-col="${fromCol}"]`);
    if (!tile) {
        isAnimating = false;
        return;
    }

    const dx = toCol - fromCol;
    const dy = toRow - fromRow;
    const moveDistance = getCellMoveDistance();

    tile.classList.add("sliding");
    tile.style.transform = `translate(${dx * moveDistance}px, ${dy * moveDistance}px)`;

    setTimeout(function () {
        board[toRow][toCol] = board[fromRow][fromCol];
        board[fromRow][fromCol] = null;
        moves++;
        selected = null;
        isAnimating = false;
        render();
    }, SLIDE_TIME);
}

function animateExit(fromRow, fromCol, exitRow, exitCol) {
    if (isAnimating) return;
    isAnimating = true;

    const tile = document.querySelector(`.tile[data-row="${fromRow}"][data-col="${fromCol}"]`);
    if (!tile) {
        isAnimating = false;
        return;
    }

    const dx = exitCol - fromCol;
    const dy = exitRow - fromRow;
    const moveDistance = getCellMoveDistance();

    tile.classList.add("exiting");
    tile.style.transform = `translate(${dx * moveDistance}px, ${dy * moveDistance}px)`;

    setTimeout(function () {
        board[fromRow][fromCol] = null;
        moves++;
        selected = null;
        isAnimating = false;
        render();
    }, EXIT_TIME);
}

function moveTileVisually(dx, dy, allowOutOfBoard, steps) {
    if (!draggingTile) return;
    const direction = getDirectionFromDrag(dx, dy);
    const maxDistance = getCellMoveDistance() * steps;
    const exitExtra = allowOutOfBoard ? 1.15 : 1;
    const limit = maxDistance * exitExtra;
    let visualX = 0;
    let visualY = 0;

    if (direction.axis === "x") visualX = clamp(dx, -limit, limit);
    else visualY = clamp(dy, -limit, limit);

    draggingTile.style.transform = `translate(${visualX}px, ${visualY}px)`;
}

function highlightDropTarget(targetRow, targetCol) {
    clearDropTargets();
    if (!isInsideBoard(targetRow, targetCol)) return;
    if (board[targetRow][targetCol]) return;
    const targetCell = document.querySelector(`.cell[data-row="${targetRow}"][data-col="${targetCol}"]`);
    if (targetCell) targetCell.classList.add("drop-target");
}

function clearDropTargets() {
    document.querySelectorAll(".drop-target").forEach(function (cell) {
        cell.classList.remove("drop-target");
    });
}

function cancelDrag() {
    resetDraggedTile();
    clearPointerState();
}

function resetDraggedTile() {
    if (draggingTile) {
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
    }
    clearDropTargets();
}

function clearPointerState() {
    pointerStart = null;
    draggingTile = null;
    dragFrom = null;
    hasDragged = false;
}

function getCellMoveDistance() {
    const firstCell = boardElement.querySelector(".cell");
    if (!firstCell) return 60;
    return firstCell.offsetWidth + getBoardGap();
}

function getBoardGap() {
    const styles = window.getComputedStyle(boardElement);
    const gap = parseFloat(styles.gap);
    return Number.isNaN(gap) ? 6 : gap;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateStats(tilesLeft) {
    if (movesElement) movesElement.textContent = moves;
    if (leftElement) leftElement.textContent = tilesLeft;
}

function setMessage(text) {
    if (messageElement) messageElement.textContent = text;
}

if (newGameBtn) newGameBtn.addEventListener("click", createBoard);
if (patternSelect) patternSelect.addEventListener("change", createBoard);
if (themeSelect) {
    themeSelect.addEventListener("change", function () {
        updateTheme();
        populatePatternOptions();
        createBoard();
    });
}

updateTheme();
populatePatternOptions();
createBoard();
