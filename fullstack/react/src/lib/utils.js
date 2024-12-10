export const getUser = async ()=> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return response.json();

}
/// 