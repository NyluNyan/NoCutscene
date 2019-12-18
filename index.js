const fs = require('fs'),
path = require('path');

module.exports = function NoCutscenes(mod) {
	
	let On;
	
	mod.game.on('enter_game', () => {
        fs.readFile(path.join(__dirname, 'Config.json'), function(err,data)
		{
			if(err)
			{
				mod.command.message('config.json not found');
				return;
			}
			On = JSON.parse(data);
			mod.command.message('Cutscenes ' + (On ? 'Dis' : 'En') + 'abled');
		});
    });
	
	mod.command.add('cs', (arg) =>
	{
		On=!On;
		mod.command.message('Cutscenes ' + (On ? 'Dis' : 'En') + 'abled');
		fs.writeFile(path.join(__dirname, 'config.json'),(JSON.stringify(On, null, 2)), err => {
			if(err) console.error(err);
		});
	});
	
	mod.hook('S_PLAY_MOVIE', 1, (event) => {
		if(On)
		{
			mod.toServer('C_END_MOVIE', 1, {movie: event.movie, unk: 1});
			return false;
		}
	});
}