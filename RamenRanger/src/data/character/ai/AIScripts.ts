//所有的AI脚本函数放在这里
namespace AIScripts{
    //测试用的， 4方向走路
    export var DebugWalkForDirection = function(cha:CharacterObj):Array<CharacterAIScript>{
        let res:Array<CharacterAIScript> = new Array<CharacterAIScript>();
        let sX = cha.setToX;
        let sY = cha.setToY;
        let rX = sX + 6 * GridWidth;
        let rY = sY + 3 * GridWidth;
		res.push(new CharacterAIScript(true, rX, sY, true, Direction.Right, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, rX, rY, true, Direction.Down, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, sX, rY, true, Direction.Left, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, sX, sY, true, Direction.Up, CharacterAction.Walk, 1));
        return res;
    }

    export var DebugStandTrickForDirection = function(cha:CharacterObj):Array<CharacterAIScript>{
        let res:Array<CharacterAIScript> = new Array<CharacterAIScript>();
        
		res.push(new CharacterAIScript(false, 0, 0, true, Direction.Right, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Up, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Left, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Right, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Up, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Left, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.Stand, 160));

        return res;
    }

    //仅仅只是从左向右或者右向左路过一下
    export var JustPassThroughFromRoad = function(cha:CharacterObj, x:number):Array<CharacterAIScript>{
        let res:Array<CharacterAIScript> = new Array<CharacterAIScript>();
		res.push(
			new CharacterAIScript(
                true, x, cha.setToY, 
                true, (x <= cha.setToX ? Direction.Left : Direction.Right),
				CharacterAction.Walk, 1
			)
		);
        return res;
    }

    export var JustPassThroughFromTrafficLight = function(street:Street, cha:CharacterObj):Array<CharacterAIScript>{
        let res:Array<CharacterAIScript> = new Array<CharacterAIScript>();
        let toGreen = street.GetTrafficLightState()["toGreen"] + Math.round(Math.random() * 10);
        let cornerX = Math.floor(Math.random() * 2) + 1;
        let cornerY = Math.floor(Math.random() * 3) + GameMapHeight + 2;
        let cPos = street.GetPixelPosByGridPos(cornerX, cornerY, true);
        let cX = cPos["x"] + Math.floor(Math.random() * GridWidth - GridWidth/2);
        let cY = cPos["y"] - Math.floor(Math.random() * GridHeight / 2);
        res.push(
            new CharacterAIScript(
                false, cha.setToX, cha.setToY,
                true, cha.direction,
                CharacterAction.Stand, toGreen
            )
        )
		res.push(
			new CharacterAIScript(
                true, cX, cY, 
                true, Direction.Up,
				CharacterAction.Walk, 1
			)
		);
        res.push(
			new CharacterAIScript(
                true, (GameMapWidth + 3)*GridWidth, cY, 
                true, Direction.Right,
				CharacterAction.Walk, 1
			)
		);
        return res;
    }
}