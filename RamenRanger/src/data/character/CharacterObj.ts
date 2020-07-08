class CharacterObj {
	
	
	private characterKey:string;	//角色资源信息的关键字

	public buddyInfo:FoodCourtBuddy;
	
	

	public constructor(characterKey:string, buddyInfo:FoodCourtBuddy) {
		this.characterKey = characterKey;
		this.buddyInfo = buddyInfo;
	}

	public GetCharacterActionInfo():CharacterActionInfo{
		return GetCharacterActionInfoByKey(this.characterKey) ;
	}
}