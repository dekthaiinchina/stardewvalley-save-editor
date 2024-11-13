import { Color } from "$lib/proxies/Color";
import { Flags } from "$lib/proxies/Flags";
import { Recipes } from "$lib/proxies/Recipes";
import { Skills } from "$lib/proxies/Skills";
import type { Item, Player } from "$types/save/1.6";

export class Farmer {
    public raw: Player;

    constructor(player: Player | undefined) {
        if (!player) throw new Error("No player provided");

        this.raw = player;
    }

    public get maxHealth() {
        return this.raw?.maxHealth;
    }

    public set maxHealth(value) {
        this.raw.maxHealth = value;
    }

    public get maxStamina() {
        return this.raw?.maxStamina;
    }

    public set maxStamina(value) {
        this.raw.maxStamina = value;
    }

    public get qiGems() {
        return this.raw?.qiGems;
    }

    public set qiGems(value) {
        this.raw.qiGems = value;
    }

    public get money() {
        return this.raw?.money;
    }

    public set money(value) {
        this.raw.money = value;
    }

    public get totalMoneyEarned() {
        return this.raw?.totalMoneyEarned;
    }

    public set totalMoneyEarned(value) {
        this.raw.totalMoneyEarned = value;
    }

    public get gender() {
        return this.raw.gender;
    }

    public set gender(value) {
        this.raw.Gender = value;
        this.raw.gender = value;
    }

    public get name() {
        return this.raw.name;
    }

    public set name(value) {
        this.raw.name = value;
    }

    public get farmName() {
        return this.raw.farmName;
    }

    public set farmName(value) {
        this.raw.farmName = value;
    }

    public get favoriteThing() {
        return this.raw.favoriteThing;
    }

    public set favoriteThing(value) {
        this.raw.favoriteThing = value;
    }

    public get clubCoins() {
        return this.raw.clubCoins;
    }

    public set clubCoins(value) {
        this.raw.clubCoins = value;
    }

    public get shirt() {
        return this.raw.shirtItem;
    }

    public set shirt(value) {
        this.raw.shirtItem = value;
    }

    public get hairstyle() {
        return this.raw.hair;
    }

    public set hairstyle(value) {
        this.raw.hair = value;
    }

    public get hairColor() {
        return new Color(this.raw.hairstyleColor);
    }

    public set hairColor(value) {
        this.raw.hairstyleColor = value;
    }

    public get skin() {
        return this.raw.skin;
    }

    public set skin(value) {
        this.raw.skin = value;
    }

    public get accessory() {
        return this.raw.accessory;
    }

    public set accessory(value) {
        this.raw.accessory = value;
    }

    public get pants() {
        return this.raw.pantsItem;
    }

    public set pants(value) {
        this.raw.pantsItem = value;
    }

    public get boots() {
        return this.raw.boots;
    }

    public set boots(value) {
        this.raw.boots = value;
    }

    public get hat() {
        return this.raw.hat;
    }

    public set hat(value) {
        this.raw.hat = value;
    }

    public get leftRing() {
        return this.raw.leftRing;
    }

    public set leftRing(value) {
        this.raw.leftRing = value;
    }

    public get rightRing() {
        return this.raw.rightRing;
    }

    public set rightRing(value) {
        this.raw.rightRing = value;
    }

    get inventory() {
        if (!this.raw) return [];

        // switch <string xsi:nil="true" /> into undefined
        const newValue = this.raw.items.Item.map((item) =>
            item === undefined || "@_xsi:nil" in item ? undefined : item,
        );

        return newValue;
    }

    set inventory(value: Array<Item | undefined>) {
        // switch undefined into <string xsi:nil="true" />
        const newValue = value.map((item) =>
            item === undefined ? { "@_xsi:nil": "true" } : item,
        );

        // @ts-expect-error
        this.raw.items.Item = newValue;
    }

    get eyeColor() {
        return new Color(this.raw.newEyeColor);
    }

    set eyeColor(value: Color) {
        this.raw.newEyeColor = value;
    }

    get craftingRecipes() {
        return new Recipes(this.raw.craftingRecipes, "craftingRecipes");
    }

    set craftingRecipes(value: Recipes<"craftingRecipes">) {
        this.raw.craftingRecipes = value.raw;
    }

    get cookingRecipes() {
        return new Recipes(this.raw.cookingRecipes, "cookingRecipes");
    }

    set cookingRecipes(value: Recipes<"cookingRecipes">) {
        this.raw.cookingRecipes = value.raw;
    }

    get flags() {
        return new Flags(this.raw);
    }

    set flags(value: Flags) {
        this.raw = value.raw;
    }

    get skills() {
        return new Skills(this.raw.experiencePoints.int);
    }

    set skills(value) {
        this.raw.experiencePoints.int = value.raw;
    }

    toJSON() {
        // Undo type safety enhancements
        // 1. Inventory, switch undefined into <string xsi:nil="true" /> (for farmhands, too) (flags too)
        // To be honest this is all kind of a hack. Realistically, we need something to parse through each node and convert
        // undefined to the appropriate xsi:nil attribute, but I couldn't find such a feature in fast-xml-parser

        // @ts-expect-error
        this.raw.items.Item = this.raw.items.Item.map((item) =>
            item === undefined ? { "@_xsi:nil": "true" } : item,
        );
        // @ts-expect-error
        this.raw.items.Item = this.raw.items.Item.map((item) =>
            item && "which" in item
                ? { ...item, which: { "@_xsi:nil": "true" } }
                : item,
        );

        // Don't forget to add which nil="true" on hats;
        if (this.raw?.hat) {
            // @ts-expect-error
            this.raw.hat.which = { "@_xsi:nil": "true" };
        }

        return JSON.stringify(this.raw);
    }
}