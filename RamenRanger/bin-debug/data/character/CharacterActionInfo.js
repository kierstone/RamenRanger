var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//一个角色的动画信息文件
var CharacterActionInfo = (function () {
    function CharacterActionInfo() {
        this.head_upper = 0; //头往上有这么多像素约定空间
        this.head_lower = 0; //头往下有这么多像素空间
        this.body_upper = 0; //身体往上
        this.body_lower = 0;
    }
    CharacterActionInfo.prototype.GetFrameInfoArray = function (direction, action) {
        switch (action) {
            case CharacterAction.Stand: return this.stand[direction];
            case CharacterAction.StandTrick: return this.standtrick[direction];
            case CharacterAction.Walk: return this.walk[direction];
        }
        return null;
    };
    CharacterActionInfo.prototype.FromJson = function (data) {
        this.key = data["key"];
        this.stand = new Array();
        this.standtrick = new Array();
        this.walk = new Array();
        var keys = ["stand", "stand_trick", "walk"];
        var arrs = [
            this.stand,
            this.standtrick,
            this.walk
        ];
        if (data["empty_height"]) {
            var eh = data["empty_height"];
            if (eh["head_upper"])
                this.head_upper = eh["head_upper"];
            if (eh["head_lower"])
                this.head_lower = eh["head_lower"];
            if (eh["body_upper"])
                this.body_upper = eh["body_upper"];
            if (eh["body_lower"])
                this.body_lower = eh["body_lower"];
        }
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (data[k]) {
                var subkeys = ["up", "down", "left", "left"]; //多读一个left当做right
                for (var n = 0; n < subkeys.length; n++) {
                    var thisVal = new Array();
                    var sk = subkeys[n];
                    if (data[k][sk]) {
                        for (var z = 0; z < data[k][sk].length; z++) {
                            thisVal.push(new CharacterFrameInfo(data[k][sk][z]["head"], data[k][sk][z]["body"]));
                        }
                    }
                    arrs[i].push(thisVal);
                }
            }
        }
    };
    return CharacterActionInfo;
}());
__reflect(CharacterActionInfo.prototype, "CharacterActionInfo");
//# sourceMappingURL=CharacterActionInfo.js.map