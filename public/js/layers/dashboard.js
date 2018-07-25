export function createDashboardLayer(font, player) {
    const LINE1 = font.size;
    const LINE2 = font.size * 2;
    
    return (context) => {
        
        font.print('MARIO', context, 16, LINE1);
        font.print(player.Play.score.toString().padStart(6, '0'), context, 16, LINE2);

        font.print('COINS', context, 90, LINE1);
        font.print(('@x' + player.Play.coins.toString().padStart(2, '0')), context, 90, LINE2);
        
        font.print('WORLD', context, 152, LINE1);
        font.print(player.Play.world, context, 160, LINE2);
        
        font.print('TIME', context, 208, LINE1);
        font.print(' ' + player.Play.time.toFixed().toString().padStart(3, '0'), context, 208, LINE2);
    }
}

//' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
