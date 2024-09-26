const router = require ('express').Router()
const {getUsers} = require ('../controllers/user')

router.get('/users',getUsers)

router.post('/add-user', (req, res) => {
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
});


router.delete('/delete-user/:id', (req, res) => {
    const {id} = req.params;
    const userIndex = users.findIndex((user)=> user.id === +id)
    if(!userIndex===-1){
        return res.status(404).json({error: 'User not found'});
    }

    
    users.splice(userIndex, 1);

    
    return res.status(200).json(users);
});


router.patch('/update-user/:id', (req, res) => {
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

module.exports = router;