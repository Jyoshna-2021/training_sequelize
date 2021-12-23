'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({Post}) {
        this.hasMany(Post, {foreignKey: "userId"});
    }
  };
  User.init({
    userId:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: 
    {  
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
       len: [3, 25]

      }
    },
    lastname: {type: DataTypes.STRING,
      set(value){
        this.setDataValue("lastname", value.substring(0,1));
      }
    },
    age: DataTypes.INTEGER,
    emailId: {
        type:DataTypes.STRING,
        validate: { isEmail: { msg: "Must have a valid email Id"}},
        get(){
          var val = this.getDataValue("emailId");
          //var endIndex = val?.indexOf("@");
          var str=  val.charAt(0);
          for (var i = 0; i< endIndex ;i++){
            str = str+ "#";
          }
          return str+ val.substring(endIndex);
        },
        unique: true
      },
    phoneNumber:{ 
      type: DataTypes.BIGINT,
      validate: {
        len: {args: [10], msg: "Phone number should be 10 in length"}
      }
    },
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: "userinfo" 
  });
  return User;
};