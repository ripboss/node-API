const getStuff = (req, res) => 
{
    res.send('<h2> Welcome to my library </h2>');
};

const getAbout = (req, res) => 
{
    res.send('<p>About me...</p>');
};

module.exports = { getLibrary: getStuff, getAbout }