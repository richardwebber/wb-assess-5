import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

const db = await connectToDB('postgresql:///animals');

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    // TODO: Implement this method
    return `${this.fname} ${this.lname}`;
  }
}

// TODO: Human.init()
Human.init(
  {
    humanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  },
  {
    modelName: 'human',
    sequelize: db,
  }
)

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// TODO: Animal.init()
Animal.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    species: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    birthYear: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'animal',
    sequelize: db,
  }
)

// TODO: Define Relationship
Human.hasMany(Animal, { foreignKey: 'humanId' })
Animal.belongsTo(Human, { foreignKey: 'humanId' })

db.sync()
export default db;
