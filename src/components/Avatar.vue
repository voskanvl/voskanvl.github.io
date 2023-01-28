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
            <div class="avatar__edit" @click="doEdit">
                <span>{{ "\u270E" }}</span>
                <div class="avatar__popup">Редактировать аватар</div>
            </div>
            <div class="avatar__undo" @click="imageSrc = defaultSrc" :hidden="clean">
                <span>{{ "\u238C" }}</span>
                <div class="avatar__popup">Вернуть аватар</div>
            </div>
            <div class="avatar__delete" @click="imageSrc = defaultSrc">
                <span>{{ "\u2A2F" }}</span>
                <div class="avatar__popup">Удалить аватар</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    const files = ref<HTMLElement | null>(null);
    const imageSrc = ref("https://100k-faces.glitch.me/random-image");
    const defaultSrc = imageSrc.value;
    const clean = ref(true);

    const doEdit = () => {
        console.log("click");
        !!files.value && files.value.click();
    };
    const changeAvatar = ({ target }: Event) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            imageSrc.value = <string>fileReader.result;
        });
        const targetFiles = (target as HTMLInputElement).files || [];
        !!targetFiles && fileReader.readAsDataURL(targetFiles[0]);
        clean.value = false;
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
        margin-bottom: 1em
        &__image
            overflow: hidden
            border-radius: 50%
            height: 20vmin
            margin: 0 auto
            aspect-ratio: 1
            +bs()
            & > img
                // width: 100%
                aspect-ratio: 1
                height: 100%
                object-fit: cover
        &__controls
            display: flex
            justify-content: space-around
            font-size: 30px
            width: 25vw
            margin: 0 auto
            & > *
                cursor: pointer
                position: relative
                & > span:hover + .avatar__popup
                    opacity: 1
                    z-index: 1

        &__delete
            color: #f70
        &__edit
            color: #33a
            @media (prefers-color-scheme: dark)
                color: #77f
        &__popup
            opacity: 0
            position: absolute
            translate: -50% 0
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
</style>
