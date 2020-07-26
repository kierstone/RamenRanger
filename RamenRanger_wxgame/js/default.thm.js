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
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","CraftNoodle":"resource/eui_skins/CraftNoodle.exml","IngredientBox":"resource/eui_skins/IngredientBox.exml","IngredientIconInBox":"resource/eui_skins/IngredientIconInBox.exml","TestScene":"resource/eui_skins/TestScene.exml","PlacingToolBox":"resource/eui_skins/PlacingToolBox.exml","CraftNoodle_TareList":"resource/eui_skins/CraftNoodle_TareList.exml","TareListItem":"resource/eui_skins/TareListItem.exml","WelcomeScene":"resource/eui_skins/WelcomeScene.exml","HorizontalFoodCourt":"resource/eui_skins/HorizontalFoodCourt.exml","HorizontalFoodCourt_StoreUI":"resource/eui_skins/HorizontalFoodCourt_StoreUI.exml","HorizontalFoodCourt_DishButton":"resource/eui_skins/HorizontalFoodCourt_DishButton.exml","HorizontalFoodCourt_BuddyInfo":"resource/eui_skins/HorizontalFoodCourt_BuddyInfo.exml","HorizontalFoodCourt_IngredientExp":"resource/eui_skins/HorizontalFoodCourt_IngredientExp.exml","FoodCourt_SelectBuddyList":"resource/eui_skins/FoodCourt_SelectBuddyList.exml","FoodCourtTeamBuild":"resource/eui_skins/FoodCourtTeamBuild.exml","FoodCourt_NormalMenu":"resource/eui_skins/FoodCourt_NormalMenu.exml","FoodCourt_StoreMenu":"resource/eui_skins/FoodCourt_StoreMenu.exml","RamenQuest_RequirementListItem":"resource/eui_skins/RamenQuest_RequirementListItem.exml","FoodCourt_EatingState":"resource/eui_skins/FoodCourt_EatingState.exml","HorizontalFoodCourt_EndToChallenge":"resource/eui_skins/HorizontalFoodCourt_EndToChallenge.exml","FoodCourt_QuestListItem":"resource/eui_skins/FoodCourt_QuestListItem.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/DialogCloseBtn.exml'] = window.DialogCloseBtn = (function (_super) {
	__extends(DialogCloseBtn, _super);
	function DialogCloseBtn() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 82;
		this.width = 82;
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
					new eui.SetProperty("_Image1","alpha",0.4)
				])
		];
	}
	var _proto = DialogCloseBtn.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_dialog_button_close";
		t.verticalCenter = 0;
		return t;
	};
	return DialogCloseBtn;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftTareListRemoveButton.exml'] = window.CraftTareListRemoveButton = (function (_super) {
	__extends(CraftTareListRemoveButton, _super);
	function CraftTareListRemoveButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 55;
		this.width = 55;
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
					new eui.SetProperty("_Image1","alpha",0.4)
				])
		];
	}
	var _proto = CraftTareListRemoveButton.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_dialog_button_remove";
		t.verticalCenter = 0;
		return t;
	};
	return CraftTareListRemoveButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CraftNoodle_TareList.exml'] = window.CraftNoodle_TareListSkin = (function (_super) {
	__extends(CraftNoodle_TareListSkin, _super);
	function CraftNoodle_TareListSkin() {
		_super.call(this);
		this.skinParts = ["Label_Title","Button_Close","Button_Remove0","Button_Remove1","Button_Remove2","Button_Remove3","Button_Remove4","Button_Remove5","Group_ItemLayer","Group_Dialog"];
		
		this.height = 1500;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this.Group_Dialog_i()];
	}
	var _proto = CraftNoodle_TareListSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Group_Dialog_i = function () {
		var t = new eui.Group();
		this.Group_Dialog = t;
		t.x = 45;
		t.y = 361;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.Label_Title_i(),this.Button_Close_i(),this.Group_ItemLayer_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 540;
		t.scale9Grid = new egret.Rectangle(25,25,50,50);
		t.source = "ui_dialog_back";
		t.width = 660;
		t.x = 0;
		t.y = 57;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_dialog_title";
		t.x = 119;
		t.y = 0;
		return t;
	};
	_proto.Label_Title_i = function () {
		var t = new eui.Label();
		this.Label_Title = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66;
		t.size = 48;
		t.stroke = 2;
		t.strokeColor = 0x905b43;
		t.text = "已经加入的调料";
		t.textAlign = "center";
		t.textColor = 0xfff8e6;
		t.verticalAlign = "middle";
		t.width = 368;
		t.x = 146;
		t.y = 17;
		return t;
	};
	_proto.Button_Close_i = function () {
		var t = new eui.Button();
		this.Button_Close = t;
		t.label = "Button";
		t.skinName = "DialogCloseBtn";
		t.x = 595;
		t.y = 19;
		return t;
	};
	_proto.Group_ItemLayer_i = function () {
		var t = new eui.Group();
		this.Group_ItemLayer = t;
		t.x = 30;
		t.y = 155;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i(),this._Group1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 410;
		t.scale9Grid = new egret.Rectangle(21,20,47,49);
		t.source = "ui_dialog_text_back";
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_ingredient_slot";
		t.x = 44;
		t.y = 44;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui_craft_ingredient_slot";
		t.y = 44;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_ingredient_slot";
		t.x = 420;
		t.y = 44;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_ingredient_slot";
		t.x = 44;
		t.y = 232;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui_craft_ingredient_slot";
		t.y = 232;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_ingredient_slot";
		t.x = 420;
		t.y = 232;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.Button_Remove0_i(),this.Button_Remove1_i(),this.Button_Remove2_i(),this.Button_Remove3_i(),this.Button_Remove4_i(),this.Button_Remove5_i()];
		return t;
	};
	_proto.Button_Remove0_i = function () {
		var t = new eui.Button();
		this.Button_Remove0 = t;
		t.label = "Button";
		t.skinName = "CraftTareListRemoveButton";
		t.x = 152.5;
		t.y = 16.5;
		return t;
	};
	_proto.Button_Remove1_i = function () {
		var t = new eui.Button();
		this.Button_Remove1 = t;
		t.label = "Button";
		t.skinName = "CraftTareListRemoveButton";
		t.x = 340.5;
		t.y = 16.5;
		return t;
	};
	_proto.Button_Remove2_i = function () {
		var t = new eui.Button();
		this.Button_Remove2 = t;
		t.label = "Button";
		t.skinName = "CraftTareListRemoveButton";
		t.x = 528.5;
		t.y = 16.5;
		return t;
	};
	_proto.Button_Remove3_i = function () {
		var t = new eui.Button();
		this.Button_Remove3 = t;
		t.label = "Button";
		t.skinName = "CraftTareListRemoveButton";
		t.x = 152.5;
		t.y = 206.5;
		return t;
	};
	_proto.Button_Remove4_i = function () {
		var t = new eui.Button();
		this.Button_Remove4 = t;
		t.label = "Button";
		t.skinName = "CraftTareListRemoveButton";
		t.x = 340.5;
		t.y = 206.5;
		return t;
	};
	_proto.Button_Remove5_i = function () {
		var t = new eui.Button();
		this.Button_Remove5 = t;
		t.label = "Button";
		t.skinName = "CraftTareListRemoveButton";
		t.x = 528.5;
		t.y = 206.5;
		return t;
	};
	return CraftNoodle_TareListSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftDoneButton.exml'] = window.CraftDoneButton = (function (_super) {
	__extends(CraftDoneButton, _super);
	function CraftDoneButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 115;
		this.width = 315;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_button_normal_down_png")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = CraftDoneButton.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "ui_button_normal_up_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_icon_ok";
		t.x = 27;
		t.y = 20;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 38;
		t.text = "大功告成";
		t.textColor = 0x6d513a;
		t.x = 120;
		t.y = 38.5;
		return t;
	};
	return CraftDoneButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftShareButton.exml'] = window.CraftShareButton = (function (_super) {
	__extends(CraftShareButton, _super);
	function CraftShareButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 115;
		this.width = 315;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_button_normal_down_png")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = CraftShareButton.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "ui_button_normal_up_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_icon_dialog";
		t.x = 35;
		t.y = 25;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 38;
		t.text = "分享";
		t.textColor = 0x6d513a;
		t.x = 157.5;
		t.y = 38.5;
		return t;
	};
	return CraftShareButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/GameButtonYellow.exml'] = window.GameButtonYellow = (function (_super) {
	__extends(GameButtonYellow, _super);
	function GameButtonYellow() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.currentState = "up";
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("labelDisplay","size",32)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_button_normal_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.4)
				])
		];
	}
	var _proto = GameButtonYellow.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "ui_button_normal_up_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.size = 38;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x6d513a;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return GameButtonYellow;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftHandBookButton.exml'] = window.CraftHandBookButton = (function (_super) {
	__extends(CraftHandBookButton, _super);
	function CraftHandBookButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 121;
		this.width = 121;
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_cycle_button_down"),
					new eui.SetProperty("_Image2","source","ui_icon_craftbook_down")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = CraftHandBookButton.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_cycle_button_up";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "ui_icon_craftbook";
		t.verticalCenter = 0;
		return t;
	};
	return CraftHandBookButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CraftNoodle.exml'] = window.CraftNoodleSkin = (function (_super) {
	__extends(CraftNoodleSkin, _super);
	var CraftNoodleSkin$Skin1 = 	(function (_super) {
		__extends(CraftNoodleSkin$Skin1, _super);
		function CraftNoodleSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","ui_craft_leftpage_down")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","ui_craft_leftpage_up")
					])
			];
		}
		var _proto = CraftNoodleSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "ui_craft_leftpage_up";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CraftNoodleSkin$Skin1;
	})(eui.Skin);

	var CraftNoodleSkin$Skin2 = 	(function (_super) {
		__extends(CraftNoodleSkin$Skin2, _super);
		function CraftNoodleSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","ui_craft_leftpage_down")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","ui_craft_leftpage_up")
					])
			];
		}
		var _proto = CraftNoodleSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "ui_craft_leftpage_up";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CraftNoodleSkin$Skin2;
	})(eui.Skin);

	var CraftNoodleSkin$Skin3 = 	(function (_super) {
		__extends(CraftNoodleSkin$Skin3, _super);
		function CraftNoodleSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","ui_craft_backbutton_down")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","ui_craft_backbutton_up")
					])
			];
		}
		var _proto = CraftNoodleSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "ui_craft_backbutton_up";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CraftNoodleSkin$Skin3;
	})(eui.Skin);

	var CraftNoodleSkin$Skin4 = 	(function (_super) {
		__extends(CraftNoodleSkin$Skin4, _super);
		function CraftNoodleSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CraftNoodleSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "ui_craft_backbutton_up";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CraftNoodleSkin$Skin4;
	})(eui.Skin);

	function CraftNoodleSkin() {
		_super.call(this);
		this.skinParts = ["Img_BKG","Img_Stick","Group_GameLayer","Group_PhotoHead","Group_PlaceTool","Group_Box","Button_PrevPage","Button_NextPage","Group_IngBox","Img_Step0","Img_Step1","Img_Step2","Img_Step3","Img_Step4","Group_Step","Label_HintText","Group_Hint","Mask_UserPortrait","Img_UserPortrait","Label_UserName","Group_PhotoMask","Rect_PhotoTaker","Button_CraftDone","Button_ShareNoodle","Group_PhotoButtons","Button_NextStep","Button_Prev","Button_TareList","Button_Handbook","Group_QuestItemList","Button_CloseQuestList","Group_QuestList","Group_UILayer","Img_BottomBorder"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.Img_BKG_i(),this.Img_Stick_i(),this.Group_GameLayer_i(),this.Group_UILayer_i(),this._Image7_i(),this.Img_BottomBorder_i()];
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
		t.anchorOffsetY = 283;
		t.source = "ui_bowl_stick1";
		t.x = 580;
		t.y = 499;
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
		t.elementsContent = [this.Group_PhotoHead_i(),this.Group_PlaceTool_i(),this.Group_IngBox_i(),this.Group_Step_i(),this.Group_Hint_i(),this.Group_PhotoMask_i(),this.Rect_PhotoTaker_i(),this.Group_PhotoButtons_i(),this.Button_NextStep_i(),this.Button_Prev_i(),this.Button_TareList_i(),this.Button_Handbook_i(),this.Group_QuestList_i()];
		return t;
	};
	_proto.Group_PhotoHead_i = function () {
		var t = new eui.Group();
		this.Group_PhotoHead = t;
		t.x = -1;
		t.y = 30;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_titleback";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_title_text";
		t.x = 115;
		t.y = 30;
		return t;
	};
	_proto.Group_PlaceTool_i = function () {
		var t = new eui.Group();
		this.Group_PlaceTool = t;
		t.width = 2;
		t.x = 375;
		t.y = 1020;
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
		t.x = 0;
		t.y = 188;
		t.skinName = CraftNoodleSkin$Skin1;
		return t;
	};
	_proto.Button_NextPage_i = function () {
		var t = new eui.Button();
		this.Button_NextPage = t;
		t.label = "";
		t.scaleX = -1;
		t.x = 750;
		t.y = 188;
		t.skinName = CraftNoodleSkin$Skin2;
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
		t.visible = false;
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
		t.x = 139;
		t.y = -2.5;
		return t;
	};
	_proto.Img_Step3_i = function () {
		var t = new eui.Image();
		this.Img_Step3 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.source = "ui_craft_tab3";
		t.x = 239;
		t.y = -2.5;
		return t;
	};
	_proto.Img_Step4_i = function () {
		var t = new eui.Image();
		this.Img_Step4 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.source = "ui_craft_tab4";
		t.x = 339;
		t.y = -2.5;
		return t;
	};
	_proto.Group_Hint_i = function () {
		var t = new eui.Group();
		this.Group_Hint = t;
		t.x = 36;
		t.y = 161;
		t.elementsContent = [this._Image3_i(),this.Label_HintText_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_hint_back";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Label_HintText_i = function () {
		var t = new eui.Label();
		this.Label_HintText = t;
		t.height = 73;
		t.size = 30;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x6d513a;
		t.verticalAlign = "middle";
		t.width = 678;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Group_PhotoMask_i = function () {
		var t = new eui.Group();
		this.Group_PhotoMask = t;
		t.anchorOffsetX = 341;
		t.anchorOffsetY = 335;
		t.x = 375;
		t.y = 604;
		t.elementsContent = [this._Image4_i(),this.Mask_UserPortrait_i(),this.Img_UserPortrait_i(),this._Rect1_i(),this.Label_UserName_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "ui_craft_photomask";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Mask_UserPortrait_i = function () {
		var t = new eui.Rect();
		this.Mask_UserPortrait = t;
		t.ellipseHeight = 146;
		t.ellipseWidth = 146;
		t.fillAlpha = 1;
		t.height = 146;
		t.strokeColor = 0x000000;
		t.strokeWeight = 2;
		t.width = 146;
		t.x = 80;
		t.y = 650;
		return t;
	};
	_proto.Img_UserPortrait_i = function () {
		var t = new eui.Image();
		this.Img_UserPortrait = t;
		t.height = 146;
		t.width = 146;
		t.x = 80;
		t.y = 650;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseHeight = 146;
		t.ellipseWidth = 146;
		t.fillAlpha = 0;
		t.height = 146;
		t.strokeColor = 0x000000;
		t.strokeWeight = 2;
		t.width = 146;
		t.x = 80;
		t.y = 650;
		return t;
	};
	_proto.Label_UserName_i = function () {
		var t = new eui.Label();
		this.Label_UserName = t;
		t.size = 34;
		t.text = "Label";
		t.textColor = 0x6d513a;
		t.x = 256;
		t.y = 706;
		return t;
	};
	_proto.Rect_PhotoTaker_i = function () {
		var t = new eui.Rect();
		this.Rect_PhotoTaker = t;
		t.anchorOffsetX = 375;
		t.anchorOffsetY = 300;
		t.fillAlpha = 0;
		t.height = 600;
		t.strokeColor = 0xf40000;
		t.width = 750;
		t.x = 400;
		t.y = 572;
		return t;
	};
	_proto.Group_PhotoButtons_i = function () {
		var t = new eui.Group();
		this.Group_PhotoButtons = t;
		t.x = 50;
		t.y = 1130.45;
		t.elementsContent = [this.Button_CraftDone_i(),this.Button_ShareNoodle_i()];
		return t;
	};
	_proto.Button_CraftDone_i = function () {
		var t = new eui.Button();
		this.Button_CraftDone = t;
		t.label = "Button";
		t.skinName = "CraftDoneButton";
		t.x = 352.5;
		t.y = 0;
		return t;
	};
	_proto.Button_ShareNoodle_i = function () {
		var t = new eui.Button();
		this.Button_ShareNoodle = t;
		t.label = "Button";
		t.skinName = "CraftShareButton";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Button_NextStep_i = function () {
		var t = new eui.Button();
		this.Button_NextStep = t;
		t.anchorOffsetY = 72;
		t.height = 72;
		t.label = "下一步";
		t.skinName = "GameButtonYellow";
		t.width = 180;
		t.x = 560;
		t.y = 872;
		return t;
	};
	_proto.Button_Prev_i = function () {
		var t = new eui.Button();
		this.Button_Prev = t;
		t.label = "";
		t.x = 12.5;
		t.y = 50;
		t.skinName = CraftNoodleSkin$Skin3;
		return t;
	};
	_proto.Button_TareList_i = function () {
		var t = new eui.Button();
		this.Button_TareList = t;
		t.anchorOffsetY = 98;
		t.height = 98;
		t.label = "出来";
		t.skinName = "GameButtonYellow";
		t.width = 195;
		t.x = 16;
		t.y = 774;
		return t;
	};
	_proto.Button_Handbook_i = function () {
		var t = new eui.Button();
		this.Button_Handbook = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 121;
		t.label = "Button";
		t.skinName = "CraftHandBookButton";
		t.x = 20;
		t.y = 750;
		return t;
	};
	_proto.Group_QuestList_i = function () {
		var t = new eui.Group();
		this.Group_QuestList = t;
		t.anchorOffsetY = 380;
		t.scaleX = 0;
		t.scaleY = 0;
		t.x = 20;
		t.y = 750;
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this.Group_QuestItemList_i(),this.Button_CloseQuestList_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 380;
		t.scale9Grid = new egret.Rectangle(26,30,51,45);
		t.source = "ui_dialog_back";
		t.width = 360;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 280;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,25,41,36);
		t.source = "ui_dialog_text_back";
		t.width = 320;
		t.y = 25;
		return t;
	};
	_proto.Group_QuestItemList_i = function () {
		var t = new eui.Group();
		this.Group_QuestItemList = t;
		t.height = 270;
		t.width = 300;
		t.x = 30;
		t.y = 30;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 5;
		t.horizontalAlign = "left";
		t.verticalAlign = "top";
		return t;
	};
	_proto.Button_CloseQuestList_i = function () {
		var t = new eui.Button();
		this.Button_CloseQuestList = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 0.5;
		t.x = 24.5;
		t.y = 316.5;
		t.skinName = CraftNoodleSkin$Skin4;
		return t;
	};
	_proto._Image7_i = function () {
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/FoodCourt_EatingState.exml'] = window.FoodCourt_EatingStateSkin = (function (_super) {
	__extends(FoodCourt_EatingStateSkin, _super);
	function FoodCourt_EatingStateSkin() {
		_super.call(this);
		this.skinParts = ["Group_IngExp"];
		
		this.height = 600;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this._Image2_i(),this.Group_IngExp_i()];
	}
	var _proto = FoodCourt_EatingStateSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(38,40,24,25);
		t.source = "ui_dialog_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.stroke = 2;
		t.strokeColor = 0x000000;
		t.text = "食材经验";
		t.top = 30;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 30;
		t.left = 30;
		t.right = 30;
		t.scale9Grid = new egret.Rectangle(39,37,6,8);
		t.source = "ui_dialog_text_back";
		t.top = 90;
		return t;
	};
	_proto.Group_IngExp_i = function () {
		var t = new eui.Group();
		this.Group_IngExp = t;
		t.bottom = 30;
		t.left = 30;
		t.right = 30;
		t.top = 90;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 200;
		t.horizontalGap = 15;
		t.requestedColumnCount = 3;
		t.rowHeight = 60;
		t.verticalGap = 10;
		return t;
	};
	return FoodCourt_EatingStateSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/FoodCourt_NormalMenu.exml'] = window.FoodCourt_NormalMenuSkin = (function (_super) {
	__extends(FoodCourt_NormalMenuSkin, _super);
	function FoodCourt_NormalMenuSkin() {
		_super.call(this);
		this.skinParts = ["Button_Go","Group_IngExp"];
		
		this.height = 600;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this.Button_Go_i(),this._Image2_i(),this.Group_IngExp_i()];
	}
	var _proto = FoodCourt_NormalMenuSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(43,39,17,19);
		t.source = "ui_dialog_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.stroke = 2;
		t.strokeColor = 0x000000;
		t.text = "食材经验";
		t.top = 100;
		return t;
	};
	_proto.Button_Go_i = function () {
		var t = new eui.Button();
		this.Button_Go = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.label = "前进";
		t.right = 30;
		t.skinName = "GameButtonYellow";
		t.top = 30;
		t.width = 350;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 40;
		t.left = 30;
		t.right = 30;
		t.scale9Grid = new egret.Rectangle(39,37,6,8);
		t.source = "ui_dialog_text_back";
		t.top = 160;
		return t;
	};
	_proto.Group_IngExp_i = function () {
		var t = new eui.Group();
		this.Group_IngExp = t;
		t.bottom = 40;
		t.left = 30;
		t.right = 30;
		t.top = 160;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 200;
		t.horizontalGap = 15;
		t.requestedColumnCount = 3;
		t.rowHeight = 60;
		t.verticalGap = 10;
		return t;
	};
	return FoodCourt_NormalMenuSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/FoodCourt_QuestListItem.exml'] = window.FoodCourt_QuestListItemSkin = (function (_super) {
	__extends(FoodCourt_QuestListItemSkin, _super);
	function FoodCourt_QuestListItemSkin() {
		_super.call(this);
		this.skinParts = ["Img_Icon","Group_Broth","Label_Desc"];
		
		this.height = 60;
		this.width = 440;
		this.elementsContent = [this.Img_Icon_i(),this.Group_Broth_i(),this.Label_Desc_i()];
	}
	var _proto = FoodCourt_QuestListItemSkin.prototype;

	_proto.Img_Icon_i = function () {
		var t = new eui.Image();
		this.Img_Icon = t;
		t.height = 60;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 60;
		return t;
	};
	_proto.Group_Broth_i = function () {
		var t = new eui.Group();
		this.Group_Broth = t;
		t.height = 2;
		t.left = 29;
		t.verticalCenter = 0;
		t.width = 2;
		return t;
	};
	_proto.Label_Desc_i = function () {
		var t = new eui.Label();
		this.Label_Desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.left = 60;
		t.right = 0;
		t.size = 30;
		t.stroke = 2;
		t.text = "Label";
		t.textAlign = "right";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return FoodCourt_QuestListItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/FoodCourt_SelectBuddyList.exml'] = window.FoodCourt_SelectBuddyListSkin = (function (_super) {
	__extends(FoodCourt_SelectBuddyListSkin, _super);
	function FoodCourt_SelectBuddyListSkin() {
		_super.call(this);
		this.skinParts = ["Label_BuddyCount","Button_Done","Group_Buddy"];
		
		this.height = 500;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.Label_BuddyCount_i(),this.Button_Done_i(),this._Scroller1_i()];
	}
	var _proto = FoodCourt_SelectBuddyListSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(30,33,42,40);
		t.source = "ui_dialog_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Label_BuddyCount_i = function () {
		var t = new eui.Label();
		this.Label_BuddyCount = t;
		t.horizontalCenter = 0;
		t.stroke = 2;
		t.strokeColor = 0x000000;
		t.text = "Label";
		t.top = 20;
		return t;
	};
	_proto.Button_Done_i = function () {
		var t = new eui.Button();
		this.Button_Done = t;
		t.bottom = 20;
		t.height = 100;
		t.horizontalCenter = 0;
		t.label = "选择完毕";
		t.skinName = "GameButtonYellow";
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 140;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 60;
		t.percentWidth = 100;
		t.x = 25;
		t.viewport = this.Group_Buddy_i();
		return t;
	};
	_proto.Group_Buddy_i = function () {
		var t = new eui.Group();
		this.Group_Buddy = t;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.requestedColumnCount = 5;
		t.verticalGap = 0;
		return t;
	};
	return FoodCourt_SelectBuddyListSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/FoodCourt_StoreMenu.exml'] = window.FoodCourt_StoreMenuSkin = (function (_super) {
	__extends(FoodCourt_StoreMenuSkin, _super);
	function FoodCourt_StoreMenuSkin() {
		_super.call(this);
		this.skinParts = ["Group_DishMenu"];
		
		this.height = 600;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this.Group_DishMenu_i()];
	}
	var _proto = FoodCourt_StoreMenuSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(42,39,19,17);
		t.source = "ui_dialog_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.stroke = 2;
		t.strokeColor = 0x000000;
		t.text = "要尝一尝哪一种美食呢？";
		t.top = 20;
		return t;
	};
	_proto.Group_DishMenu_i = function () {
		var t = new eui.Group();
		this.Group_DishMenu = t;
		t.height = 600;
		t.horizontalCenter = 0;
		t.top = 60;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		t.horizontalAlign = "center";
		t.verticalAlign = "top";
		return t;
	};
	return FoodCourt_StoreMenuSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/FoodCourtTeamBuild.exml'] = window.FoodCourtTeamBuildSkin = (function (_super) {
	__extends(FoodCourtTeamBuildSkin, _super);
	function FoodCourtTeamBuildSkin() {
		_super.call(this);
		this.skinParts = ["Group_Street","Rect_Hunger","Group_HungerBar"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.Group_Street_i(),this.Group_HungerBar_i()];
	}
	var _proto = FoodCourtTeamBuildSkin.prototype;

	_proto.Group_Street_i = function () {
		var t = new eui.Group();
		this.Group_Street = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Group_HungerBar_i = function () {
		var t = new eui.Group();
		this.Group_HungerBar = t;
		t.x = 20;
		t.y = 420;
		t.elementsContent = [this._Image1_i(),this.Rect_Hunger_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.source = "scene_bowl_normal";
		t.width = 30;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Rect_Hunger_i = function () {
		var t = new eui.Rect();
		this.Rect_Hunger = t;
		t.fillColor = 0x7aed21;
		t.height = 20;
		t.width = 20;
		t.x = 40;
		t.y = 5;
		return t;
	};
	return FoodCourtTeamBuildSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftButtonDelete.exml'] = window.CraftButtonDelete = (function (_super) {
	__extends(CraftButtonDelete, _super);
	function CraftButtonDelete() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 78;
		this.width = 78;
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_craft_button_delete_down")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = CraftButtonDelete.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_button_delete_up";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui_craft_icon_trash";
		t.verticalCenter = -4;
		return t;
	};
	return CraftButtonDelete;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftButtonRotateLeft.exml'] = window.CraftButtonRotateLeft = (function (_super) {
	__extends(CraftButtonRotateLeft, _super);
	function CraftButtonRotateLeft() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.currentState = "up";
		this.height = 142;
		this.width = 142;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_craft_cycle_button_down")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = CraftButtonRotateLeft.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_cycle_button_up";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_icon_rotateminus";
		t.x = 31;
		t.y = 16;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.height = 50;
		t.rotation = -10;
		t.width = 50;
		t.x = 71;
		t.y = 85;
		return t;
	};
	return CraftButtonRotateLeft;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftButtonRotateRight.exml'] = window.CraftButtonRotateRight = (function (_super) {
	__extends(CraftButtonRotateRight, _super);
	function CraftButtonRotateRight() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.currentState = "up";
		this.height = 142;
		this.width = 142;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_craft_cycle_button_down")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = CraftButtonRotateRight.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_cycle_button_up";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_icon_rotateplus";
		t.x = 31;
		t.y = 16;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.height = 50;
		t.rotation = 10;
		t.width = 50;
		t.x = 71;
		t.y = 85;
		return t;
	};
	return CraftButtonRotateRight;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/CraftSizeButtonReset.exml'] = window.CraftSizeButtonReset = (function (_super) {
	__extends(CraftSizeButtonReset, _super);
	function CraftSizeButtonReset() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.currentState = "up";
		this.height = 121;
		this.width = 121;
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this._Label1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_cycle_button_down")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = CraftSizeButtonReset.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_cycle_button_up";
		t.verticalCenter = 0;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.anchorOffsetX = 0;
		t.height = 60;
		t.horizontalCenter = 0;
		t.width = 60;
		t.y = 36;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "标准";
		t.textAlign = "center";
		t.textColor = 0x6d513a;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.y = 12;
		return t;
	};
	return CraftSizeButtonReset;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/GameButtonGreen.exml'] = window.GameButtonGreen = (function (_super) {
	__extends(GameButtonGreen, _super);
	function GameButtonGreen() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.currentState = "up";
		this.height = 100;
		this.width = 300;
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_button_green_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.4),
					new eui.SetProperty("iconDisplay","alpha",0.4),
					new eui.SetProperty("labelDisplay","alpha",0.4)
				])
		];
	}
	var _proto = GameButtonGreen.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "ui_button_green_up_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.horizontalCenter = 0;
		t.stroke = 2;
		t.strokeColor = 0x47ad00;
		t.text = "Label";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return GameButtonGreen;
})(eui.Skin);generateEUI.paths['resource/eui_skins/game_element/GameCycleButton.exml'] = window.GameCycleButton = (function (_super) {
	__extends(GameCycleButton, _super);
	function GameCycleButton() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.currentState = "up";
		this.height = 142;
		this.width = 142;
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","ui_craft_cycle_button_down")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = GameCycleButton.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_cycle_button_up";
		t.verticalCenter = 0;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.percentHeight = 60;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 60;
		return t;
	};
	return GameCycleButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HorizontalFoodCourt_BuddyInfo.exml'] = window.HorizontalFoodCourt_BuddyInfoSkin = (function (_super) {
	__extends(HorizontalFoodCourt_BuddyInfoSkin, _super);
	function HorizontalFoodCourt_BuddyInfoSkin() {
		_super.call(this);
		this.skinParts = ["Group_Port","Label_Hunger","Img_SelectSign"];
		
		this.height = 200;
		this.width = 150;
		this.elementsContent = [this._Image1_i(),this.Group_Port_i(),this._Rect1_i(),this._Label1_i(),this.Label_Hunger_i(),this.Img_SelectSign_i()];
	}
	var _proto = HorizontalFoodCourt_BuddyInfoSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(27,30,50,45);
		t.source = "ui_dialog_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Group_Port_i = function () {
		var t = new eui.Group();
		this.Group_Port = t;
		t.height = 144;
		t.horizontalCenter = 0;
		t.width = 144;
		t.y = 8;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseWidth = 50;
		t.fillAlpha = 0;
		t.height = 40;
		t.strokeColor = 0xB77B7B;
		t.strokeWeight = 3;
		t.width = 40;
		t.x = 14;
		t.y = 152;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "饱";
		t.textColor = 0x6d513a;
		t.x = 19;
		t.y = 158;
		return t;
	};
	_proto.Label_Hunger_i = function () {
		var t = new eui.Label();
		this.Label_Hunger = t;
		t.text = "20";
		t.textColor = 0x6D513A;
		t.x = 96;
		t.y = 157;
		return t;
	};
	_proto.Img_SelectSign_i = function () {
		var t = new eui.Image();
		this.Img_SelectSign = t;
		t.horizontalCenter = 0;
		t.source = "ui_craft_selected";
		t.y = 30;
		return t;
	};
	return HorizontalFoodCourt_BuddyInfoSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HorizontalFoodCourt_DishButton.exml'] = window.HorizontalFoodCourt_DishButtonSkin = (function (_super) {
	__extends(HorizontalFoodCourt_DishButtonSkin, _super);
	function HorizontalFoodCourt_DishButtonSkin() {
		_super.call(this);
		this.skinParts = ["Label_Name","Group_Ingredient","Group_Buddy","Button_Eat","Group_Ramen","Rect_ColorSign"];
		
		this.currentState = "normal";
		this.height = 440;
		this.width = 200;
		this.elementsContent = [this._Image1_i(),this.Label_Name_i(),this._Group3_i()];
		this._Label1_i();
		
		this._Rect1_i();
		
		this.Group_Ingredient_i();
		
		this._Group1_i();
		
		this._Label2_i();
		
		this._Rect2_i();
		
		this.Group_Buddy_i();
		
		this._Group2_i();
		
		this.Button_Eat_i();
		
		this.states = [
			new eui.State ("normal",
				[
					new eui.SetProperty("Label_Name","horizontalCenter",0),
					new eui.SetProperty("Label_Name","y",215),
					new eui.SetProperty("Label_Name","anchorOffsetY",15),
					new eui.SetProperty("_Image2","x",0),
					new eui.SetProperty("_Image2","y",0),
					new eui.SetProperty("Group_Ramen","x",80),
					new eui.SetProperty("Group_Ramen","y",150),
					new eui.SetProperty("Rect_ColorSign","x",110),
					new eui.SetProperty("Rect_ColorSign","y",115),
					new eui.SetProperty("_Group3","horizontalCenter",0),
					new eui.SetProperty("_Group3","top",20),
					new eui.SetProperty("","height",250)
				])
			,
			new eui.State ("selected",
				[
					new eui.AddItems("_Label1","_Group1",0,""),
					new eui.AddItems("_Rect1","_Group1",1,""),
					new eui.AddItems("Group_Ingredient","_Group1",1,""),
					new eui.AddItems("_Group1","",2,"_Group3"),
					new eui.AddItems("_Label2","_Group2",0,""),
					new eui.AddItems("_Rect2","_Group2",1,""),
					new eui.AddItems("Group_Buddy","_Group2",1,""),
					new eui.AddItems("_Group2","",2,"_Group3"),
					new eui.AddItems("Button_Eat","",2,"_Group3"),
					new eui.SetProperty("Label_Name","horizontalCenter",2),
					new eui.SetProperty("Label_Name","y",215),
					new eui.SetProperty("Label_Name","anchorOffsetY",15),
					new eui.SetProperty("Label_Name","textAlign","center"),
					new eui.SetProperty("_Image2","x",0),
					new eui.SetProperty("_Image2","y",0),
					new eui.SetProperty("Group_Ramen","x",80),
					new eui.SetProperty("Group_Ramen","y",150),
					new eui.SetProperty("Rect_ColorSign","x",110),
					new eui.SetProperty("Rect_ColorSign","y",115),
					new eui.SetProperty("_Group3","horizontalCenter",0),
					new eui.SetProperty("_Group3","top",20),
					new eui.SetProperty("","width",300),
					new eui.SetProperty("","height",500)
				])
		];
	}
	var _proto = HorizontalFoodCourt_DishButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(29,29,47,45);
		t.source = "ui_dialog_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Label_Name_i = function () {
		var t = new eui.Label();
		this.Label_Name = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x6D513A;
		t.verticalAlign = "middle";
		t.width = 180;
		t.y = 20;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.x = 20;
		t.y = 280;
		t.elementsContent = [];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.size = 20;
		t.text = "主要食材";
		t.textAlign = "left";
		t.textColor = 0x6D513A;
		t.verticalAlign = "middle";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x6d513a;
		t.height = 1;
		t.width = 260;
		t.x = 0;
		t.y = 20;
		return t;
	};
	_proto.Group_Ingredient_i = function () {
		var t = new eui.Group();
		this.Group_Ingredient = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 156;
		t.x = 104;
		t.y = -30;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "right";
		t.horizontalGap = 3;
		t.orientation = "rows";
		t.requestedColumnCount = 3;
		t.requestedRowCount = 1;
		t.verticalAlign = "top";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.x = 20;
		t.y = 350;
		t.elementsContent = [];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.size = 20;
		t.text = "喜好队友";
		t.textAlign = "left";
		t.textColor = 0x6D513A;
		t.verticalAlign = "middle";
		t.x = 2;
		t.y = 0;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		this._Rect2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x6D513A;
		t.height = 1;
		t.width = 260;
		t.x = 0;
		t.y = 20;
		return t;
	};
	_proto.Group_Buddy_i = function () {
		var t = new eui.Group();
		this.Group_Buddy = t;
		t.height = 50;
		t.width = 156;
		t.x = 104;
		t.y = -30;
		t.layout = this._TileLayout2_i();
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "right";
		t.horizontalGap = 3;
		t.orientation = "rows";
		t.requestedColumnCount = 3;
		t.requestedRowCount = 1;
		t.verticalAlign = "top";
		t.verticalGap = 0;
		return t;
	};
	_proto.Button_Eat_i = function () {
		var t = new eui.Button();
		this.Button_Eat = t;
		t.height = 80;
		t.horizontalCenter = 0;
		t.label = "开吃";
		t.skinName = "GameButtonYellow";
		t.width = 260;
		t.y = 397;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		this._Group3 = t;
		t.x = 20;
		t.y = 20;
		t.elementsContent = [this._Image2_i(),this.Group_Ramen_i(),this.Rect_ColorSign_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.scale9Grid = new egret.Rectangle(20,19,48,47);
		t.source = "ui_dialog_text_back";
		t.width = 160;
		t.x = 20;
		t.y = 60;
		return t;
	};
	_proto.Group_Ramen_i = function () {
		var t = new eui.Group();
		this.Group_Ramen = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scaleX = 2;
		t.scaleY = 2;
		t.x = 100;
		t.y = 210;
		return t;
	};
	_proto.Rect_ColorSign_i = function () {
		var t = new eui.Rect();
		this.Rect_ColorSign = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseWidth = 50;
		t.height = 50;
		t.strokeAlpha = 1;
		t.strokeColor = 0x6d513a;
		t.strokeWeight = 3;
		t.width = 50;
		t.x = 130;
		t.y = 175;
		return t;
	};
	return HorizontalFoodCourt_DishButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HorizontalFoodCourt_EndToChallenge.exml'] = window.HorizontalFoodCourt_EndToChallengeSkin = (function (_super) {
	__extends(HorizontalFoodCourt_EndToChallengeSkin, _super);
	function HorizontalFoodCourt_EndToChallengeSkin() {
		_super.call(this);
		this.skinParts = ["Group_IngExp","Group_Quest","Button_Start"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = HorizontalFoodCourt_EndToChallengeSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.top = 250;
		t.width = 500;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.Group_IngExp_i(),this._Image3_i(),this.Group_Quest_i(),this._Label1_i(),this._Label2_i(),this.Button_Start_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 910;
		t.scale9Grid = new egret.Rectangle(45,47,11,12);
		t.source = "ui_dialog_back";
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 260;
		t.left = 30;
		t.right = 30;
		t.scale9Grid = new egret.Rectangle(32,39,19,16);
		t.source = "ui_dialog_text_back";
		t.top = 80;
		return t;
	};
	_proto.Group_IngExp_i = function () {
		var t = new eui.Group();
		this.Group_IngExp = t;
		t.height = 260;
		t.left = 30;
		t.right = 30;
		t.top = 80;
		t.width = 420;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 135;
		t.horizontalGap = 5;
		t.requestedColumnCount = 3;
		t.rowHeight = 60;
		t.verticalGap = 5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 360;
		t.left = 30;
		t.right = 30;
		t.scale9Grid = new egret.Rectangle(32,39,19,16);
		t.source = "ui_dialog_text_back";
		t.top = 420;
		return t;
	};
	_proto.Group_Quest_i = function () {
		var t = new eui.Group();
		this.Group_Quest = t;
		t.left = 30;
		t.right = 30;
		t.top = 420;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.stroke = 2;
		t.text = "探索结束";
		t.y = 30;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.stroke = 2;
		t.text = "拉面挑战";
		t.top = 360;
		return t;
	};
	_proto.Button_Start_i = function () {
		var t = new eui.Button();
		this.Button_Start = t;
		t.bottom = 30;
		t.height = 80;
		t.label = "开始拉面挑战";
		t.left = 30;
		t.right = 30;
		t.skinName = "GameButtonYellow";
		return t;
	};
	return HorizontalFoodCourt_EndToChallengeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HorizontalFoodCourt_IngredientExp.exml'] = window.HorizontalFoodCourt_IngredientExpSkin = (function (_super) {
	__extends(HorizontalFoodCourt_IngredientExpSkin, _super);
	function HorizontalFoodCourt_IngredientExpSkin() {
		_super.call(this);
		this.skinParts = ["Img_Icon","Label_Exp"];
		
		this.height = 60;
		this.width = 150;
		this.elementsContent = [this.Img_Icon_i(),this.Label_Exp_i()];
	}
	var _proto = HorizontalFoodCourt_IngredientExpSkin.prototype;

	_proto.Img_Icon_i = function () {
		var t = new eui.Image();
		this.Img_Icon = t;
		t.height = 60;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 60;
		return t;
	};
	_proto.Label_Exp_i = function () {
		var t = new eui.Label();
		this.Label_Exp = t;
		t.right = 0;
		t.stroke = 2;
		t.text = "Label";
		t.textAlign = "right";
		t.verticalCenter = 0;
		t.width = 90;
		return t;
	};
	return HorizontalFoodCourt_IngredientExpSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HorizontalFoodCourt_StoreUI.exml'] = window.HorizontalFoodCourt_StoreUISkin = (function (_super) {
	__extends(HorizontalFoodCourt_StoreUISkin, _super);
	function HorizontalFoodCourt_StoreUISkin() {
		_super.call(this);
		this.skinParts = ["Button_Cancel","Img_Port","Img_Back","Label_Dialog","Group_Window"];
		
		this.height = 2000;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this.Group_Window_i()];
	}
	var _proto = HorizontalFoodCourt_StoreUISkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Group_Window_i = function () {
		var t = new eui.Group();
		this.Group_Window = t;
		t.horizontalCenter = 0;
		t.y = 500;
		t.elementsContent = [this.Button_Cancel_i(),this.Img_Port_i(),this.Img_Back_i(),this.Label_Dialog_i()];
		return t;
	};
	_proto.Button_Cancel_i = function () {
		var t = new eui.Button();
		this.Button_Cancel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 126;
		t.label = "不吃了(饱腹-5)";
		t.skinName = "GameButtonGreen";
		t.width = 298;
		t.x = 370;
		t.y = -250;
		return t;
	};
	_proto.Img_Port_i = function () {
		var t = new eui.Image();
		this.Img_Port = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 225;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "npc_half_port_0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Img_Back_i = function () {
		var t = new eui.Image();
		this.Img_Back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 350;
		t.scale9Grid = new egret.Rectangle(25,31,50,43);
		t.source = "ui_dialog_back";
		t.width = 700;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Label_Dialog_i = function () {
		var t = new eui.Label();
		this.Label_Dialog = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.size = 40;
		t.text = "";
		t.textColor = 0x6D513A;
		t.width = 620;
		t.x = 30;
		t.y = 35;
		return t;
	};
	return HorizontalFoodCourt_StoreUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HorizontalFoodCourt.exml'] = window.HorizontalFoodCourtSkin = (function (_super) {
	__extends(HorizontalFoodCourtSkin, _super);
	function HorizontalFoodCourtSkin() {
		_super.call(this);
		this.skinParts = ["Group_Street","Button_Go","Rect_HungerBack","Rect_HungerNow","Rect_HungerMinus","Label_Hungry","Group_Ing","Scroller_IngLearn","Group_Test"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.Group_Street_i(),this.Button_Go_i(),this._Group2_i(),this.Scroller_IngLearn_i(),this.Group_Test_i()];
	}
	var _proto = HorizontalFoodCourtSkin.prototype;

	_proto.Group_Street_i = function () {
		var t = new eui.Group();
		this.Group_Street = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Button_Go_i = function () {
		var t = new eui.Button();
		this.Button_Go = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.label = "前进";
		t.skinName = "GameButtonYellow";
		t.visible = false;
		t.width = 220;
		t.x = 500;
		t.y = 450;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 19;
		t.y = 20;
		t.elementsContent = [this._Image1_i(),this._Group1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.source = "scene_bowl_normal";
		t.width = 40;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 55;
		t.y = 0;
		t.elementsContent = [this.Rect_HungerBack_i(),this.Rect_HungerNow_i(),this.Rect_HungerMinus_i(),this.Label_Hungry_i()];
		return t;
	};
	_proto.Rect_HungerBack_i = function () {
		var t = new eui.Rect();
		this.Rect_HungerBack = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 40;
		t.strokeAlpha = 1;
		t.strokeColor = 0xffffff;
		t.strokeWeight = 2;
		t.width = 40;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Rect_HungerNow_i = function () {
		var t = new eui.Rect();
		this.Rect_HungerNow = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x80f907;
		t.height = 36;
		t.strokeAlpha = 0;
		t.strokeColor = 0xFFFFFF;
		t.width = 36;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.Rect_HungerMinus_i = function () {
		var t = new eui.Rect();
		this.Rect_HungerMinus = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0xff0000;
		t.height = 36;
		t.strokeAlpha = 0;
		t.strokeColor = 0xFFFFFF;
		t.strokeWeight = 0;
		t.width = 36;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.Label_Hungry_i = function () {
		var t = new eui.Label();
		this.Label_Hungry = t;
		t.size = 30;
		t.text = "Label";
		t.visible = false;
		t.x = 6;
		t.y = 5;
		return t;
	};
	_proto.Scroller_IngLearn_i = function () {
		var t = new eui.Scroller();
		this.Scroller_IngLearn = t;
		t.height = 200;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 1134;
		t.viewport = this.Group_Ing_i();
		return t;
	};
	_proto.Group_Ing_i = function () {
		var t = new eui.Group();
		this.Group_Ing = t;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 10;
		t.orientation = "rows";
		t.requestedColumnCount = 3;
		t.verticalGap = 10;
		return t;
	};
	_proto.Group_Test_i = function () {
		var t = new eui.Group();
		this.Group_Test = t;
		t.height = 200;
		t.visible = false;
		t.width = 200;
		t.x = 248;
		t.y = 878;
		return t;
	};
	return HorizontalFoodCourtSkin;
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
		t.horizontalCenter = 0;
		t.source = "ui_craft_selected";
		t.top = 0;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/PlacingToolBox.exml'] = window.PlacingToolBoxSkin = (function (_super) {
	__extends(PlacingToolBoxSkin, _super);
	function PlacingToolBoxSkin() {
		_super.call(this);
		this.skinParts = ["Button_OK","Button_Delete","Button_RotateRight","Button_RotateLeft","Button_Flip","SizeBar_Fill","SizeBar_Mask","SizeBarPuller","Group_SizeBar","Button_Reset"];
		
		this.height = 475;
		this.width = 700;
		this.elementsContent = [this._Image1_i(),this.Button_OK_i(),this.Button_Delete_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = PlacingToolBoxSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(28,27,47,48);
		t.source = "ui_dialog_back";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.Button_OK_i = function () {
		var t = new eui.Button();
		this.Button_OK = t;
		t.height = 78;
		t.label = "";
		t.skinName = "GameButtonGreen";
		t.width = 210;
		t.x = 455;
		t.y = 380;
		return t;
	};
	_proto.Button_Delete_i = function () {
		var t = new eui.Button();
		this.Button_Delete = t;
		t.label = "Button";
		t.skinName = "CraftButtonDelete";
		t.x = 35;
		t.y = 380;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentWidth = 90;
		t.x = 35;
		t.y = 199;
		t.elementsContent = [this._Image2_i(),this.Button_RotateRight_i(),this.Button_RotateLeft_i(),this.Button_Flip_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 170;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,21,48,48);
		t.source = "ui_dialog_text_back";
		t.percentWidth = 100;
		t.y = 0;
		return t;
	};
	_proto.Button_RotateRight_i = function () {
		var t = new eui.Button();
		this.Button_RotateRight = t;
		t.anchorOffsetX = 71;
		t.anchorOffsetY = 71;
		t.label = "Button";
		t.skinName = "CraftButtonRotateRight";
		t.x = 530;
		t.y = 85;
		return t;
	};
	_proto.Button_RotateLeft_i = function () {
		var t = new eui.Button();
		this.Button_RotateLeft = t;
		t.anchorOffsetX = 71;
		t.anchorOffsetY = 71;
		t.label = "Button";
		t.skinName = "CraftButtonRotateLeft";
		t.x = 100;
		t.y = 85;
		return t;
	};
	_proto.Button_Flip_i = function () {
		var t = new eui.Button();
		this.Button_Flip = t;
		t.anchorOffsetX = 71;
		t.anchorOffsetY = 71;
		t.label = "";
		t.skinName = "GameCycleButton";
		t.x = 315;
		t.y = 85;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentWidth = 90;
		t.x = 35;
		t.y = 33;
		t.elementsContent = [this._Image3_i(),this.Group_SizeBar_i(),this.Button_Reset_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 145;
		t.scale9Grid = new egret.Rectangle(20,21,48,48);
		t.source = "ui_dialog_text_back";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.Group_SizeBar_i = function () {
		var t = new eui.Group();
		this.Group_SizeBar = t;
		t.x = 29;
		t.y = 39;
		t.elementsContent = [this._Image4_i(),this.SizeBar_Fill_i(),this.SizeBar_Mask_i(),this.SizeBarPuller_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "ui_craft_sizebar_back";
		t.x = 0;
		t.y = 4;
		return t;
	};
	_proto.SizeBar_Fill_i = function () {
		var t = new eui.Image();
		this.SizeBar_Fill = t;
		t.source = "ui_craft_sizebar_filler";
		t.x = 9.5;
		t.y = 13.5;
		return t;
	};
	_proto.SizeBar_Mask_i = function () {
		var t = new eui.Rect();
		this.SizeBar_Mask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 59;
		t.width = 403;
		t.x = 9.5;
		t.y = 13.5;
		return t;
	};
	_proto.SizeBarPuller_i = function () {
		var t = new eui.Image();
		this.SizeBarPuller = t;
		t.anchorOffsetX = 13;
		t.anchorOffsetY = 43;
		t.source = "ui_craft_sizebar_puller";
		t.x = 409;
		t.y = 43;
		return t;
	};
	_proto.Button_Reset_i = function () {
		var t = new eui.Button();
		this.Button_Reset = t;
		t.label = "Button";
		t.skinName = "CraftSizeButtonReset";
		t.x = 480;
		t.y = 12;
		return t;
	};
	return PlacingToolBoxSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/RamenQuest_RequirementListItem.exml'] = window.RamenQuest_RequirementListItemSkin = (function (_super) {
	__extends(RamenQuest_RequirementListItemSkin, _super);
	function RamenQuest_RequirementListItemSkin() {
		_super.call(this);
		this.skinParts = ["Img_Icon","Img_DoneSign","Group_Broth","Label_Desc"];
		
		this.height = 40;
		this.width = 300;
		this.elementsContent = [this.Img_Icon_i(),this.Img_DoneSign_i(),this.Group_Broth_i(),this.Label_Desc_i()];
	}
	var _proto = RamenQuest_RequirementListItemSkin.prototype;

	_proto.Img_Icon_i = function () {
		var t = new eui.Image();
		this.Img_Icon = t;
		t.height = 40;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 40;
		return t;
	};
	_proto.Img_DoneSign_i = function () {
		var t = new eui.Image();
		this.Img_DoneSign = t;
		t.height = 40;
		t.right = 0;
		t.source = "ui_craft_selected";
		t.verticalCenter = 0;
		t.width = 40;
		return t;
	};
	_proto.Group_Broth_i = function () {
		var t = new eui.Group();
		this.Group_Broth = t;
		t.height = 2;
		t.left = 19;
		t.verticalCenter = 0;
		t.width = 2;
		return t;
	};
	_proto.Label_Desc_i = function () {
		var t = new eui.Label();
		this.Label_Desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.horizontalCenter = 0;
		t.size = 20;
		t.stroke = 1;
		t.text = "Label";
		t.verticalAlign = "middle";
		t.width = 220;
		t.y = 0;
		return t;
	};
	return RamenQuest_RequirementListItemSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/TareListItem.exml'] = window.TareListItemSkin = (function (_super) {
	__extends(TareListItemSkin, _super);
	function TareListItemSkin() {
		_super.call(this);
		this.skinParts = ["Img_Icon","Label_Name"];
		
		this.height = 145;
		this.width = 132;
		this.elementsContent = [this.Img_Icon_i(),this._Image1_i(),this.Label_Name_i()];
	}
	var _proto = TareListItemSkin.prototype;

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
	return TareListItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TestScene.exml'] = window.TestSceneSkin = (function (_super) {
	__extends(TestSceneSkin, _super);
	function TestSceneSkin() {
		_super.call(this);
		this.skinParts = ["gameLayer","HSilder_Size","Label_Size","Button_Start","Button_Back"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this.gameLayer_i(),this.HSilder_Size_i(),this._Label1_i(),this.Label_Size_i(),this.Button_Start_i(),this.Button_Back_i()];
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
		t.x = 116.61;
		t.y = 1000;
		return t;
	};
	_proto.Button_Back_i = function () {
		var t = new eui.Button();
		this.Button_Back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.76;
		t.label = "返回";
		t.width = 240.91;
		t.x = 392.28;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/WelcomeScene.exml'] = window.WelcomeSceneSkin = (function (_super) {
	__extends(WelcomeSceneSkin, _super);
	function WelcomeSceneSkin() {
		_super.call(this);
		this.skinParts = ["Button_Ramen","Button_Street","Button_Test"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Rect2_i(),this.Button_Ramen_i(),this.Button_Street_i(),this.Button_Test_i(),this._Label1_i()];
	}
	var _proto = WelcomeSceneSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 151;
		t.strokeColor = 0x0050ff;
		t.strokeWeight = 2;
		t.width = 209;
		t.x = 12.5;
		t.y = 101.5;
		return t;
	};
	_proto.Button_Ramen_i = function () {
		var t = new eui.Button();
		this.Button_Ramen = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 46;
		t.label = "Ramen";
		t.width = 174;
		t.x = 30;
		t.y = 131;
		return t;
	};
	_proto.Button_Street_i = function () {
		var t = new eui.Button();
		this.Button_Street = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 114;
		t.label = "开始游戏";
		t.width = 467;
		t.x = 141.5;
		t.y = 647;
		return t;
	};
	_proto.Button_Test_i = function () {
		var t = new eui.Button();
		this.Button_Test = t;
		t.anchorOffsetX = 0;
		t.label = "Test";
		t.width = 176;
		t.x = 28;
		t.y = 192;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "测试区";
		t.x = 72;
		t.y = 86.5;
		return t;
	};
	return WelcomeSceneSkin;
})(eui.Skin);