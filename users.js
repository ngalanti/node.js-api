 const users = [
    {
        id:1,
        name:'itaychok',
        age:16,
        height:'120 cm',
     
    },
    {
        id:2,
        name:'aviv',
        age:17,
        height:'160 cm'
    }
];

const getUser = (id)=>{
    return users[id];
}
module.exports= {
users,
getUser,

};