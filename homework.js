// -------------------------- Home work 16 --------------------------
// -------------------------- Arsenov Ivan --------------------------

// 1 Task
// Есть класс Planet
// function Planet(name) {
//     this.name = name;
//     this.getName = function () {
//         return 'Planet name is ' + this.name;
//     }
// }
// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет принимать, кроме name, название спутника
// (satelliteName). Переопределите метод getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку + дополнительный
// текст 'The satellite is' + satelliteName.
// Например:
// var earth = new PlanetWithSatellite('earth', 'moon');
// earth.getName(); // 'Planet name is earth. The satellite is moon’

/**
 * @description - класс родитель Planet содержит свойства и методы
 * @param {name} name - передаём название планеты
 * @return {строка} - возвращаем строку  
 */

function Planet (name) {
    this.name = name;
    this.getName = function () {
        return 'Planet name is ' + this.name;
    }
}

/**
 * @description - класс наследник от родителя класса Planet
 * @param {name} name - передаём название планеты
 * @param {satelliteName} satelliteName - передаём название спутника
 */

function PlanetWithSatellite(name, satelliteName) {
    Planet.apply(this, arguments); // Получаем контекст класса Planet
    this.getName = this.getName() + '. ' + 'The satellite is ' + satelliteName; // Переопределяем метод getName()
}

// Связываем прототип дочернего класса с прототипом родителя
PlanetWithSatellite.prototype = Object.create(Planet.prototype); 
PlanetWithSatellite.prototype.constructor = PlanetWithSatellite;

const planet = new PlanetWithSatellite('earth', 'moon'); // Создаём экземпляр дочернего класса
console.log(planet.getName);

// 2 Task
// Создайте класс "Здание" (пусть у него будет имя, количество этажей, метод "получить количество этажей" и метод
// "установить количество этажей").
// Создайте наследников этого класса:
// классы "Жилой дом" и "Торговый центр". Используйте функциональное наследование.
// У жилого дома появиться свойство "количество квартир на этаже", а метод "получить количество этажей" должен
// вернуть объект вида {этажи: 5, всего Квартир: 5 * количество Квартир}.
// У торгового центра появиться свойство "количество магазинов на этаже", а метод "получить количество этажей"
// должен вернуть объект вида {этажи: 3, всего магазинов: 3 * количество магазинов}
// От каждого класса создать экземпляр (дом, торговый центр)

/**
 * @description - Создаём родительский класс Building
 * @param {name} name - передаём название дома
 * @param {numberFloors} numberFloors - передаём количество этажей
 * @return {numberFloors} - возвращаем количество этажей
 */

function Building (name, numberFloors) {
    this.name = name; // Название дома
    this.numberFloors = numberFloors; // Количество этажей
    this.getNumberFloors = function () { return numberFloors; }; // Создаём метод для получение количества этажей
    this.setupNumberFloors = function () { return this.numberFloors; }; // Создаём метод для установки количества этажей
}

/**
 * @description - создаём класс наследник House от родительского класса Building
 * @param {name} name - передаём название дома
 * @param {numberFloors} numberFloors - передаём количество этажей
 * @param {numFlat} numFlat - передаём количество квартир
 * @return {undefined} - undefined
 */

function House (name, numberFloors, numFlat) {
    Building.apply(this, arguments); // Получаем контекст вызова класса Building
    this.numFlat = numFlat; // Количество квартир
    // Создаём свойство в котором будем хранить значения количества этажей и общее количество квартир
    this.getNumberFloors = {
        floors: this.setupNumberFloors(),
        totalFlat: this.numberFloors * numFlat
    }
}

/**
 * @description - создаём класс наследник ShoppingCenter от родительского класса Building
 * @param {name} name - передаём название дома
 * @param {numberFloors} numberFloors - передаём количество этажей
 * @param {numShop} numShop - передаём количество магазинов
 * @return {undefined} - undefined
 */

function ShoppingCenter (name, numberFloors, numShop) {
    Building.apply(this, arguments); // Получаем контекст класса Building
    this.numShop = numShop; // Количество магазинов
    // Создаём свойство в котором будем хранить значения количества этажей и общее количество квартир
    this.getNumberFloors = {
        floors:  this.setupNumberFloors(),
        totalFlat: this.numberFloors * numShop
    }
}

// Связываем прототипы классов House и ShoppingCenter с прототипом родительского класса Building

House.prototype = Object.create(Building.prototype);
House.prototype.constructor = House;

ShoppingCenter.prototype = Object.create(Building.prototype);
ShoppingCenter.prototype.constructor = ShoppingCenter;

const house = new House('tower', 5, 5); // Создаём экземпляр класса House
const shop = new ShoppingCenter('shop', 3, 3); // Создаём экземпляр класса ShoppingCenter

// Выводим результат в консоль
console.log(house.getNumberFloors);
console.log(shop.getNumberFloors);

// 3 Task
// Создать класс "мебель" с базовыми свойствами "имя", "цена" и методом "получить информацию" (метод должен быть объявлен с помощью
// прототипов Func.prototype). Создать два экземпляра класса "мебель": экземпляр "Офисная мебель" и "Мебель для дома".
// Необходимо придумать им по одному свойству, которое будет характерно только для этого экземпляра(например, для офисной мебели -
// наличие компьютерного стола и шредера). Метод "получить информацию" должен учитывать и добавленное вами новое свойство.
// Задача на переопределение класса.

/**
 * @description - создаём родительский класс Furniture
 */

class Furniture {

    /**
     * @description - конструктор класса Furniture
     * @param {name} name - наименование мебели
     * @param {price} price - стоимость мебели
     * @return {undfined} - undefined
     */

    constuctor(name, price) {
        this.name = name; // наименование мебели
        this.price = price; // стоимость мебели
    }
}

Furniture.prototype.getInfo = function () { return this.prop; } // Создаём метод класса Furniture, который получает дополнительное свойство от наследников экземпляра класса

const officeFurniture = new Furniture('office furniture ', 3500); // Создаём экземпляр класса Furniture
const homeFurniture = new Furniture('office furniture ', 4000); // Создаём экземпляр класса Furniture

officeFurniture.prop = 'office table are available'; // Создаём дополнительное свойство в экземпляре класса officeFurniture
homeFurniture.prop = 'computer desk and shredder available'; // Создаём дополнительное свойство в экземпляре класса homeFurniture

// Выводим результат в консольное окно браузера
console.log(officeFurniture.getInfo());
console.log(homeFurniture.getInfo());


// Task 4
// Создать класс "Пользователь" с базовыми свойствами "имя", "дата регистрации" и методом "получить информацию" (метод должен
// вывести имя и дату регистрации). Метод должен быть объявлен с помощью прототипов (Func.prototype...). Создать два наследника
// класса "Пользователь": класс "Админ" и класс "Гость".
// У класса "Админ" должно быть дополнительное свойство "суперАдмин" (может быть true/false, должно быть скрытым). Свойства определюятся
// в момент вызова конструктора.
// У класса "Гость" должно быть свойство "срокДействия" (validDate, например), содержащее дату (например, одну неделю от момента
// регистрации).
// У классов-наследников метод "получить информацию" должен так же содержать информацию о дополнительных свойствах ("суперАдмин" и
// "срокДействия")

/**
 * @description - создаём родительский класс User
 */

class User {
    /**
     * @description - конструктор класса User
     * @param {name} name - имя пользователя 
     * @param {dateReg} dateReg - время и дата регистрации
     */
    constructor (name, dateReg) {
        this.name = name;
        this.dateReg = dateReg;
    }
}

User.prototype.getInfo = function() { return this.name + ' ' + this.dateReg }; // Создаём метод для класса User, этот метод получает имя и дату регистрации

/**
 * @description - создаём класс наследник Admin от класса родителя User
 */

class Admin extends User {
    /**
     * @description - конструктор класса Admin
     * @param {name} name - имя пользователя 
     * @param {dateReg} dateReg - время и дата регистрации
     */
    constructor (name, dateReg) {
        super (name, dateReg);
        this.getInfo = this.getInfo();
    }
}

Admin.prototype.superAdmin = true || false; // Создаём скрытое свойство для класса admin

/**
 * @description - создаём класс наследник Guest от класса родителя User
 */

class Guest extends User {
    /**
     * @description - конструктор класса Guest
     * @param {name} name - имя пользователя 
     * @param {dateReg} dateReg - время и дата регистрации
     */
    constructor (name, dateReg) {
        super (name, dateReg);
        this.validDate = '12 days';
        this.getInfo = this.getInfo() + ' ' + this.validDate;
    }
}

const admin = new Admin ('Petrovich', '14.08.2014'); // Создаём экземпляр класса Admin
const guest = new Guest ('Vasya', '17.02.2018'); // Создаём экземпляр класса guest

// Вывод результата в консоль браузера
console.log(admin.getInfo);
console.log(guest.getInfo);