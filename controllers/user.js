const User = require('../models/user')

const users = [
    { id: 1, name: 'Yarin' },
    { id: 2, name: 'Dori' },
    { id: 3, name: 'Shilo' },
];

const getUsers = (req, res) => {
    res.json(users);
}

const addUser = async(req, res) => {
    const {name, username } = req.body;
    
    const user = new User ({name, username});

    await user.save();

    return res.status(201).json({message:'User created'});
};

const updateUser = ((req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    if (!name&&!id) {
        return res.status(400).json({ error: 'Name/id is required' });
    }




    const user = users.find((user)=> user.id === +id)

    if(!user){
        return res.status(404).json({error: 'User not found'});
    }
    const userExists = users.find(user => user.name.includes(name));
    if (userExists) {
        return res.status(400).json({ error: 'User with this name already exists' });
    }
   
    //....
    user.name = name
    return res.status(200).json(users)
})
const deleteUser = (req, res) => {
    const {id} = req.params;
    const userIndex = users.findIndex((user)=> user.id === +id)
    if(!userIndex===-1){
        return res.status(404).json({error: 'User not found'});
    }

    
    users.splice(userIndex, 1);

    
    return res.status(200).json(users);
};


module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}