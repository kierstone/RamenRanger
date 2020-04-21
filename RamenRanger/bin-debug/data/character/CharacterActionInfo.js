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
        this.allActions = new Array();
    }
    CharacterActionInfo.prototype.GetFrameInfoArray = function (direction, action) {
        if (this.allActions && this.allActions[action])
            return this.allActions[action][direction];
        return null;
    };
    CharacterActionInfo.prototype.FromJson = function (data) {
        this.key = data["key"];
        this.toPreloadHeadImage = new Array();
        this.toPreloadBodyImage = new Array();
        this.toPreloadEmoteImage = new Array();
        this.allActions = new Array();
        var keys = [
            "stand", "stand_trick", "walk", "ordering", "eat", "chew", "think", "discover",
            "nod", "clap", "spicy", "takephoto", "salty", "sigh", "smile", "hate"
        ];
        /**
         * Stand = 0,
            StandTrick = 1,
            Walk = 2,
            Order = 3,
            Eat = 4,
            Chew = 5,
            Think = 6,
            Discover = 7,
            Nod = 8,
            Clap = 9,
            Spicy = 10,
            TakePhoto = 11,
            Salty = 12,
            Sigh = 13,
            Smile = 14,
            Hate = 15
         */
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
            var thisArr = new Array();
            if (data[k]) {
                var aKey = data[k]["key"];
                var subkeys = ["up", "down", "left", "left"]; //多读一个left当做right
                for (var n = 0; n < subkeys.length; n++) {
                    var thisVal = new Array();
                    var sk = subkeys[n];
                    if (data[k][sk]) {
                        var dKey = data[k][sk]["dir"];
                        var aHead = data[k][sk]["head"] ? data[k][sk]["head"] : new Array();
                        var aBody = data[k][sk]["body"] ? data[k][sk]["body"] : new Array();
                        var aEmote = data[k][sk]["emote"] ? data[k][sk]["emote"] : new Array();
                        var lLen = Math.max(aHead.length, aBody.length, aEmote.length);
                        for (var z = 0; z < lLen; z++) {
                            var hf = "";
                            var bf = "";
                            var ef = "";
                            if (z < aHead.length)
                                hf = this.key + "_" + aKey + "_" + dKey + "_head_" + aHead[z].toString();
                            if (z < aBody.length)
                                bf = this.key + "_" + aKey + "_" + dKey + "_body_" + aBody[z].toString();
                            if (z < aEmote.length)
                                ef = this.key + "_" + aKey + "_" + dKey + "_emote_" + aEmote[z].toString();
                            thisVal.push(new CharacterFrameInfo(hf, bf, ef));
                            if (hf != "" && this.toPreloadHeadImage.indexOf(hf) < 0)
                                this.toPreloadHeadImage.push(hf);
                            if (bf != "" && this.toPreloadBodyImage.indexOf(bf) < 0)
                                this.toPreloadBodyImage.push(bf);
                            if (ef != "" && this.toPreloadEmoteImage.indexOf(ef) < 0)
                                this.toPreloadBodyImage.push(ef);
                        }
                    }
                    thisArr.push(thisVal);
                }
            }
            this.allActions.push(thisArr);
        }
    };
    return CharacterActionInfo;
}());
__reflect(CharacterActionInfo.prototype, "CharacterActionInfo");
//# sourceMappingURL=CharacterActionInfo.js.map