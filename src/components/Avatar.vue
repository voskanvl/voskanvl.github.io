<template>
    <div class="avatar">
        <div class="avatar__image">
            <img :src="imageSrc" alt="" />
        </div>
        <div class="avatar__controls">
            <input
                type="file"
                name=""
                id=""
                ref="files"
                hidden
                accept="image/*"
                @change="changeAvatar"
            />
            <icon-with-popup
                class="avatar__edit"
                @click="doEdit"
                :icon="'\u270E'"
                caption="Редактировать аватар"
            />
            <icon-with-popup
                class="avatar__undo"
                @click="doReturn"
                :hidden="clean"
                :icon="'\u238C'"
                caption="Вернуть аватар"
            />
            <icon-with-popup
                class="avatar__delete"
                @click="doClear"
                :icon="'\u2A2F'"
                caption="Удалить аватар"
            />
        </div>
        <input type="submit" value="Сохранить" @click="save" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import iconWithPopup from "./iconWithPopup.vue";
    import defaultSrc from "../assets/1_W35QUSvGpcLuxPo3SRTH4w.webp";

    const files = ref<HTMLInputElement | null>(null);
    const currentSrc = localStorage.getItem("img") || defaultSrc;
    const imageSrc = ref(currentSrc);
    const clean = ref(true);

    const doEdit = () => {
        !!files.value && files.value.click();
    };

    const doClear = () => {
        imageSrc.value = defaultSrc;
        clean.value = true;
        !!files.value && (files.value.files = null);
    };

    const doReturn = () => {
        imageSrc.value = currentSrc;
        clean.value = true;
    };

    const changeAvatar = ({ target }: Event) => {
        console.log("change Avatar");
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            console.log("change target", (target as HTMLInputElement).value);
            imageSrc.value = <string>fileReader.result;
        });
        const targetFiles = (target as HTMLInputElement).files || [];
        !!targetFiles && fileReader.readAsDataURL(targetFiles[0]);
        clean.value = false;
    };

    const save = () => {
        localStorage.setItem("img", imageSrc.value);
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    =bs($shift:4px,$blur:12px)
        box-shadow: (-$shift) (-$shift) $blur #fff7, $shift $shift $blur #0007

    .avatar
        user-select: none
        margin: 0 auto
        position: relative
        margin-bottom: 4em
        &__image
            overflow: hidden
            border-radius: 50%
            height: 20vmin
            margin: 1em auto 0
            aspect-ratio: 1
            +bs()
            & > img
                // width: 100%
                aspect-ratio: 1
                height: 100%
                object-fit: cover
        &__controls
            display: flex
            justify-content: space-between
            font-size: 30px
            width: 25vw
            margin: 0 auto
            & > *
                flex: 0 0 50%


        &__delete
            color: #f70
        &__edit
            color: #33a
            @media (prefers-color-scheme: dark)
                color: #77f
        &__popup
            opacity: 0
            position: absolute
            translate: -50% -0%
            transition: opacity 1s
            z-index: 1
            background: #fffd
            top: 100%
            left: 50%
            padding: 1em
            font-size: 14px
            z-index: -1
            @media (prefers-color-scheme: dark)
                background-color: #242424dd

        &__undo
            &[hidden]
                display: none
</style>
