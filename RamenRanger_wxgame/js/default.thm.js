var egret = window.egret;window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","CraftNoodle":"resource/eui_skins/CraftNoodle.exml","Street":"resource/eui_skins/Street.exml","StreetGround":"resource/eui_skins/StreetGround.exml","IngredientBox":"resource/eui_skins/IngredientBox.exml","IngredientIconInBox":"resource/eui_skins/IngredientIconInBox.exml","TestScene":"resource/eui_skins/TestScene.exml"};generateEUI.paths['resource/eui_skins/Button_Craft_Next.exml'] = window.Button_Craft_Next = (function (_super) {
	__extends(Button_Craft_Next, _super);
	function Button_Craft_Next() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 72;
		this.width = 165;
		this.elementsContent = [];
		this._Image1_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",0,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image1","source","ui_craft_button_next1")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = Button_Craft_Next.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_button_next";
		t.verticalCenter = 0;
		return t;
	};
	return Button_Craft_Next;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Button_Craft_Prev.exml'] = window.Button_Craft_Prev = (function (_super) {
	__extends(Button_Craft_Prev, _super);
	function Button_Craft_Prev() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 96;
		this.width = 75;
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","scaleX",1.1),
					new eui.SetProperty("_Image1","scaleY",1.1)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = Button_Craft_Prev.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_button_back";
		t.verticalCenter = 0;
		return t;
	};
	return Button_Craft_Prev;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Button_IngredientBox_Right.exml'] = window.Button_IngredientBox_Right = (function (_super) {
	__extends(Button_IngredientBox_Right, _super);
	function Button_IngredientBox_Right() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 135;
		this.width = 75;
		this.elementsContent = [];
		this._Image1_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",0,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image1","scaleX",1.1),
					new eui.SetProperty("_Image1","scaleY",1.1)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = Button_IngredientBox_Right.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_button_right";
		t.verticalCenter = 0;
		return t;
	};
	return Button_IngredientBox_Right;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Button_IngredientBoxLeft.exml'] = window.Button_IngredientBoxLeft = (function (_super) {
	__extends(Button_IngredientBoxLeft, _super);
	function Button_IngredientBoxLeft() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 135;
		this.width = 75;
		this.elementsContent = [];
		this._Image1_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",0,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image1","scaleX",1.1),
					new eui.SetProperty("_Image1","scaleY",1.1)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = Button_IngredientBoxLeft.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_button_left";
		t.verticalCenter = 0;
		return t;
	};
	return Button_IngredientBoxLeft;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CharacterObj.exml'] = window.CharacterObjSkin = (function (_super) {
	__extends(CharacterObjSkin, _super);
	function CharacterObjSkin() {
		_super.call(this);
		this.skinParts = ["body","head"];
		
		this.height = 200;
		this.width = 100;
		this.elementsContent = [this.body_i(),this.head_i()];
	}
	var _proto = CharacterObjSkin.prototype;

	_proto.body_i = function () {
		var t = new eui.Image();
		this.body = t;
		t.source = "";
		t.x = 10;
		t.y = 62.8;
		return t;
	};
	_proto.head_i = function () {
		var t = new eui.Image();
		this.head = t;
		t.source = "";
		t.x = 13;
		t.y = 0;
		return t;
	};
	return CharacterObjSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CraftNoodle.exml'] = window.CraftNoodleSkin = (function (_super) {
	__extends(CraftNoodleSkin, _super);
	function CraftNoodleSkin() {
		_super.call(this);
		this.skinParts = ["Img_BKG","Img_Stick","Group_GameLayer","HSilider_Size","Button_Rotate","Button_Flip","Button_OK","Button_Delete","Group_PlaceTool","Group_Box","Button_PrevPage","Button_NextPage","Group_IngBox","Img_Step0","Img_Step1","Img_Step2","Img_Step3","Img_Step4","Group_Step","Button_NextStep","Button_Prev","Group_UILayer","Img_BottomBorder"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.Img_BKG_i(),this.Img_Stick_i(),this.Group_GameLayer_i(),this.Group_UILayer_i(),this._Image1_i(),this.Img_BottomBorder_i()];
	}
	var _proto = CraftNoodleSkin.prototype;

	_proto.Img_BKG_i = function () {
		var t = new eui.Image();
		this.Img_BKG = t;
		t.fillMode = "repeat";
		t.height = 100;
		t.source = "ui_craft_back";
		t.width = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Img_Stick_i = function () {
		var t = new eui.Image();
		this.Img_Stick = t;
		t.source = "ui_bowl_stick1";
		t.x = 580;
		t.y = 216;
		return t;
	};
	_proto.Group_GameLayer_i = function () {
		var t = new eui.Group();
		this.Group_GameLayer = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Group_UILayer_i = function () {
		var t = new eui.Group();
		this.Group_UILayer = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this.Group_PlaceTool_i(),this.Group_IngBox_i(),this.Group_Step_i(),this.Button_NextStep_i(),this.Button_Prev_i()];
		return t;
	};
	_proto.Group_PlaceTool_i = function () {
		var t = new eui.Group();
		this.Group_PlaceTool = t;
		t.x = 125;
		t.y = 1020;
		t.elementsContent = [this.HSilider_Size_i(),this.Button_Rotate_i(),this.Button_Flip_i(),this.Button_OK_i(),this.Button_Delete_i()];
		return t;
	};
	_proto.HSilider_Size_i = function () {
		var t = new eui.HSlider();
		this.HSilider_Size = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.maximum = 4;
		t.value = 2;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Button_Rotate_i = function () {
		var t = new eui.Button();
		this.Button_Rotate = t;
		t.label = "旋转";
		t.x = 121.15;
		t.y = 82.85;
		return t;
	};
	_proto.Button_Flip_i = function () {
		var t = new eui.Button();
		this.Button_Flip = t;
		t.label = "翻转";
		t.x = 275.15;
		t.y = 82.85;
		return t;
	};
	_proto.Button_OK_i = function () {
		var t = new eui.Button();
		this.Button_OK = t;
		t.label = "好的";
		t.x = 125.15;
		t.y = 165.58;
		return t;
	};
	_proto.Button_Delete_i = function () {
		var t = new eui.Button();
		this.Button_Delete = t;
		t.label = "删除";
		t.x = 275.15;
		t.y = 165.58;
		return t;
	};
	_proto.Group_IngBox_i = function () {
		var t = new eui.Group();
		this.Group_IngBox = t;
		t.anchorOffsetY = 540;
		t.height = 700;
		t.x = 0;
		t.y = 1334;
		t.elementsContent = [this.Group_Box_i(),this.Button_PrevPage_i(),this.Button_NextPage_i()];
		return t;
	};
	_proto.Group_Box_i = function () {
		var t = new eui.Group();
		this.Group_Box = t;
		t.height = 540;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Button_PrevPage_i = function () {
		var t = new eui.Button();
		this.Button_PrevPage = t;
		t.label = "";
		t.skinName = "Button_IngredientBoxLeft";
		t.x = 0;
		t.y = 180;
		return t;
	};
	_proto.Button_NextPage_i = function () {
		var t = new eui.Button();
		this.Button_NextPage = t;
		t.label = "Button";
		t.skinName = "Button_IngredientBox_Right";
		t.x = 675;
		t.y = 180;
		return t;
	};
	_proto.Group_Step_i = function () {
		var t = new eui.Group();
		this.Group_Step = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.width = 480;
		t.y = 100;
		t.elementsContent = [this.Img_Step0_i(),this.Img_Step1_i(),this.Img_Step2_i(),this.Img_Step3_i(),this.Img_Step4_i()];
		return t;
	};
	_proto.Img_Step0_i = function () {
		var t = new eui.Image();
		this.Img_Step0 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.source = "ui_craft_tab0";
		t.x = 40;
		t.y = 0;
		return t;
	};
	_proto.Img_Step1_i = function () {
		var t = new eui.Image();
		this.Img_Step1 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.source = "ui_craft_tab1";
		t.x = 140;
		t.y = 0;
		return t;
	};
	_proto.Img_Step2_i = function () {
		var t = new eui.Image();
		this.Img_Step2 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.source = "ui_craft_tab2";
		t.x = 240;
		t.y = 0;
		return t;
	};
	_proto.Img_Step3_i = function () {
		var t = new eui.Image();
		this.Img_Step3 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.source = "ui_craft_tab3";
		t.x = 340;
		t.y = 0;
		return t;
	};
	_proto.Img_Step4_i = function () {
		var t = new eui.Image();
		this.Img_Step4 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.source = "ui_craft_tab4";
		t.x = 440;
		t.y = 0;
		return t;
	};
	_proto.Button_NextStep_i = function () {
		var t = new eui.Button();
		this.Button_NextStep = t;
		t.label = "";
		t.skinName = "Button_Craft_Next";
		t.x = 560;
		t.y = 800;
		return t;
	};
	_proto.Button_Prev_i = function () {
		var t = new eui.Button();
		this.Button_Prev = t;
		t.label = "";
		t.skinName = "Button_Craft_Prev";
		t.x = 12.5;
		t.y = 50;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.fillMode = "repeat";
		t.horizontalCenter = 0;
		t.scaleY = -1;
		t.source = "ui_craft_border";
		t.top = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Img_BottomBorder_i = function () {
		var t = new eui.Image();
		this.Img_BottomBorder = t;
		t.anchorOffsetY = 52;
		t.fillMode = "repeat";
		t.horizontalCenter = 0;
		t.source = "ui_craft_border";
		t.percentWidth = 100;
		t.y = 1334;
		return t;
	};
	return CraftNoodleSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/IngredientBox.exml'] = window.IngredientBoxSkin = (function (_super) {
	__extends(IngredientBoxSkin, _super);
	function IngredientBoxSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 505;
		this.width = 750;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = IngredientBoxSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui_craft_ingredientbox";
		t.verticalCenter = 0;
		return t;
	};
	return IngredientBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/IngredientIconInBox.exml'] = window.IngredientIconInBoxSkin = (function (_super) {
	__extends(IngredientIconInBoxSkin, _super);
	function IngredientIconInBoxSkin() {
		_super.call(this);
		this.skinParts = ["Img_Icon","Label_Name","Img_Select"];
		
		this.height = 145;
		this.width = 132;
		this.elementsContent = [this.Img_Icon_i(),this._Image1_i(),this.Label_Name_i(),this.Img_Select_i()];
	}
	var _proto = IngredientIconInBoxSkin.prototype;

	_proto.Img_Icon_i = function () {
		var t = new eui.Image();
		this.Img_Icon = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 100;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "ui_craft_ingredientname";
		return t;
	};
	_proto.Label_Name_i = function () {
		var t = new eui.Label();
		this.Label_Name = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 124;
		t.y = 100;
		return t;
	};
	_proto.Img_Select_i = function () {
		var t = new eui.Image();
		this.Img_Select = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 67;
		t.width = 72;
		t.x = 28;
		t.y = 35;
		return t;
	};
	return IngredientIconInBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Street.exml'] = window.StreetSkin = (function (_super) {
	__extends(StreetSkin, _super);
	function StreetSkin() {
		_super.call(this);
		this.skinParts = ["gameLayer"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.gameLayer_i()];
	}
	var _proto = StreetSkin.prototype;

	_proto.gameLayer_i = function () {
		var t = new eui.Group();
		this.gameLayer = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return StreetSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/StreetGround.exml'] = window.StreetGroundSkin = (function (_super) {
	__extends(StreetGroundSkin, _super);
	function StreetGroundSkin() {
		_super.call(this);
		this.skinParts = ["bkg","ground","road","streetside","street"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.bkg_i(),this.ground_i(),this.road_i(),this.streetside_i(),this.street_i()];
	}
	var _proto = StreetGroundSkin.prototype;

	_proto.bkg_i = function () {
		var t = new eui.Image();
		this.bkg = t;
		t.source = "wooden_chair";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.ground_i = function () {
		var t = new eui.Image();
		this.ground = t;
		t.fillMode = "repeat";
		t.source = "wooden_chair";
		t.x = 0;
		t.y = 75;
		return t;
	};
	_proto.road_i = function () {
		var t = new eui.Image();
		this.road = t;
		t.source = "wooden_chair";
		t.x = 0;
		t.y = 150;
		return t;
	};
	_proto.streetside_i = function () {
		var t = new eui.Image();
		this.streetside = t;
		t.source = "wooden_chair";
		t.x = 0;
		t.y = 225;
		return t;
	};
	_proto.street_i = function () {
		var t = new eui.Image();
		this.street = t;
		t.source = "wooden_chair";
		t.x = 0;
		t.y = 300;
		return t;
	};
	return StreetGroundSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TestScene.exml'] = window.TestSceneSkin = (function (_super) {
	__extends(TestSceneSkin, _super);
	function TestSceneSkin() {
		_super.call(this);
		this.skinParts = ["gameLayer","HSilder_Size","Label_Size","Button_Start"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this.gameLayer_i(),this.HSilder_Size_i(),this._Label1_i(),this.Label_Size_i(),this.Button_Start_i()];
	}
	var _proto = TestSceneSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x0086ff;
		t.height = 2000;
		t.horizontalCenter = 0;
		t.top = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.gameLayer_i = function () {
		var t = new eui.Group();
		this.gameLayer = t;
		t.height = 800;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.HSilder_Size_i = function () {
		var t = new eui.HSlider();
		this.HSilder_Size = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 89;
		t.maximum = 20;
		t.minimum = -10;
		t.value = 0;
		t.width = 470;
		t.x = 184.28;
		t.y = 829.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "画面尺寸";
		t.x = 43.61;
		t.y = 859;
		return t;
	};
	_proto.Label_Size_i = function () {
		var t = new eui.Label();
		this.Label_Size = t;
		t.text = "1.0";
		t.x = 673.31;
		t.y = 859;
		return t;
	};
	_proto.Button_Start_i = function () {
		var t = new eui.Button();
		this.Button_Start = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.76;
		t.label = "开吃";
		t.width = 240.91;
		t.x = 163.61;
		t.y = 1000;
		return t;
	};
	return TestSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TrafficLight.exml'] = window.TrafficLightSkin = (function (_super) {
	__extends(TrafficLightSkin, _super);
	function TrafficLightSkin() {
		_super.call(this);
		this.skinParts = ["seat","red","yellow","green"];
		
		this.height = 225;
		this.width = 75;
		this.elementsContent = [this.seat_i(),this.red_i(),this.yellow_i(),this.green_i()];
	}
	var _proto = TrafficLightSkin.prototype;

	_proto.seat_i = function () {
		var t = new eui.Image();
		this.seat = t;
		t.source = "trafficlight";
		t.x = 16;
		t.y = 2;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.source = "trafficlight_red";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.yellow_i = function () {
		var t = new eui.Image();
		this.yellow = t;
		t.source = "trafficlight_yellow";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.green_i = function () {
		var t = new eui.Image();
		this.green = t;
		t.source = "trafficlight_green";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return TrafficLightSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);