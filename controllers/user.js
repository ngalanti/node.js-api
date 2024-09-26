const users = [
    { id: 1, name: 'aviv' },
    { id: 2, name: 'itay' },
    { id: 3, name: 'shilo' },
];

const getUsers = (req, res) => {
    res.json(users);
}

const addUser = (req, res) => {
    const { name } = req.body;

    
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    
    const userExists = users.find(user => user.name.includes(name));
    if (userExists) {
        return res.status(400).json({ error: 'User with this name already exists' });
    }

   
    const newUser = {
        id: users.length + 1,
        name,
    };
    users.push(newUser);

    
    return res.status(201).json(users);
}

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
    updateUser
}