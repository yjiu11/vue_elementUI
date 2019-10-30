<template>
    <div>
        <script id="editor" type="text/plain"></script>
    </div>
</template>
<script>
    export default {
        name: 'ue',
        data () {
            return {
                editor: null
            }
        },
        props: {
            value: '',
            config: {}
        },
        mounted () {
            // this.editor = window.UE.getEditor('editor', this.config);
            // this.editor.addListener('ready',  () => {
            //     this.editor.setContent(this.value)
            // })

            const _this = this;
            _this.editor = UE.getEditor('editor',_this.config);
        },
        methods: {
            getUEContent () {
                return this.editor.getContent()
            },
            getAllHtml () {
                return this.editor.getAllHtml()
            },
            getContentTxt(){
                return this.editor.getContentTxt()
            }
        },
        destroyed () {
            this.editor.destroy()
        }
    }
</script>