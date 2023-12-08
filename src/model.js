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
    human_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    fname: {
      type: DataTypes.VARCHAR(20),
      allowNull: false
    },
    lname: {
      type: DataTypes.VARCHAR(20),
      allowNull: false
    },
    email: {
      type: DataTypes.VARCHAR(35),
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
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.VARCHAR(20),
      allowNull: false
    },
    species: {
      type: DataTypes.VARCHAR(20),
      allowNull: false
    },
    birth_year: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'animal',
    sequelize: db,
  }
)

// TODO: Define Relationship
Human.hasMany(Animal, { foreignKey: 'human_id' })
Animal.belongsTo(Human, { foreignKey: 'human_id' })

export default db;
