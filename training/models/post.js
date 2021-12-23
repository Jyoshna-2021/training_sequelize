'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate({User}) {
       this.belongsTo(User, {foreignKey: "userId"});
    }
  };
  Post.init({
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content:{ type: DataTypes.STRING,
      get(){
        var val = this.getDataValue("content").trim();
        var length = val.length;
        var str = val.substring(0,5);
        if(length > 5){
          str = str+ "...";
        }
        return  str;
      }
    },
    title: {type: DataTypes.STRING,
  
      validate: {
        len: {args: [10, ], msg: "Title should be greater than 10 in length"}
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "posts"
  });
  return Post;
};