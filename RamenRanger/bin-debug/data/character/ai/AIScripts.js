//所有的AI脚本函数放在这里
var AIScripts;
(function (AIScripts) {
    //测试用的， 4方向走路
    AIScripts.DebugWalkForDirection = function (cha) {
        var res = new Array();
        var chaPos = cha.GetPos();
        var sX = chaPos.x;
        var sY = chaPos.y;
        var rX = sX + 6 * GridWidth;
        var rY = sY + 3 * GridWidth;
        res.push(new CharacterAIScript(true, rX, sY, true, Direction.Right, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, rX, rY, true, Direction.Down, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, sX, rY, true, Direction.Left, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, sX, sY, true, Direction.Up, CharacterAction.Walk, 1));
        return res;
    };
    AIScripts.DebugDoAllAction = function (cha) {
        var res = new Array();
        //先转头
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.Stand, cha.GetActionFrameCount(Direction.Down, CharacterAction.Stand)));
        for (var i = 3; i < 16; i++) {
            res.push(new CharacterAIScript(false, 0, 0, false, Direction.Down, i, cha.GetActionFrameCount(Direction.Down, i)));
        }
        return res;
    };
    AIScripts.DebugStandTrickForDirection = function (cha) {
        var res = new Array();
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Right, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Up, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Left, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.StandTrick, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Right, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Up, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Left, CharacterAction.Stand, 160));
        res.push(new CharacterAIScript(false, 0, 0, true, Direction.Down, CharacterAction.Stand, 160));
        return res;
    };
    //仅仅只是从左向右或者右向左路过一下
    AIScripts.JustPassThroughFromRoad = function (cha, x) {
        var res = new Array();
        var chaPos = cha.GetPos();
        res.push(new CharacterAIScript(true, x, chaPos.y, true, (x <= chaPos.x ? Direction.Left : Direction.Right), CharacterAction.Walk, 1));
        return res;
    };
    AIScripts.JustPassThroughFromTrafficLight = function (street, cha) {
        var res = new Array();
        var toGreen = street.GetTrafficLightState()["toGreen"] + Math.round(Math.random() * 10);
        var cornerX = Math.floor(Math.random() * 2) + 1;
        var cornerY = Math.floor(Math.random() * 3) + GameMapHeight + 2;
        var cPos = street.GetPixelPosByGridPos(cornerX, cornerY, true);
        var cX = cPos["x"] + Math.floor(Math.random() * GridWidth - GridWidth / 2);
        var cY = cPos["y"] - Math.floor(Math.random() * GridHeight / 2);
        var chaPos = cha.GetPos();
        res.push(new CharacterAIScript(false, chaPos.x, chaPos.y, true, cha.direction, CharacterAction.Stand, toGreen));
        res.push(new CharacterAIScript(true, cX, cY, true, Direction.Up, CharacterAction.Walk, 1));
        res.push(new CharacterAIScript(true, (GameMapWidth + 3) * GridWidth, cY, true, Direction.Right, CharacterAction.Walk, 1));
        return res;
    };
})(AIScripts || (AIScripts = {}));
//# sourceMappingURL=AIScripts.js.map