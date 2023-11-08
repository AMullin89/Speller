<template>
    <dialog open>
        <header>
            <slot name="header">
                <h2>{{ title }}</h2>
            </slot>
        </header>
        <section>
            <slot name="message">
            </slot>
        </section>
        <menu>
            <slot name="buttons">
            </slot>
        </menu>
    </dialog>
</template>

<script>
export default {
    props: ['title']
}
</script>