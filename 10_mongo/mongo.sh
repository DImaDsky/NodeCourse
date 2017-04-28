#Добавлять список имён в коллекцию;
#Выводить этот список;
#Изменять несколько имён на другие;
#Отображать изменённый список;
#Удалять новые имена из п.3.

use testdb
show collections
db.users.insert({name:'Anya', gender:'f'});
db.users.insert({name:'Vanya', gender:'f'});
db.users.insert({name:'Tanya', gender:'f'});
db.users.insert({name:'Vova'});
db.users.insert({name:'Vova', gender:'f'});
db.users.count();

db.users.update({name:"Vanya"},{$set:{gender:'m'}})
db.users.update({name:"Vanya"},{$set:{gender:'m'}}, {multi:true})
db.users.find()

db.users.remove({name:"Vanya"});
db.users.find()


mongoshef core