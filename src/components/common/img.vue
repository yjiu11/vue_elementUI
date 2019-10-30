<template>
	<viewer :images="image">
	   <img :src="image[0].src" style="display:none;">
	</viewer>
</template>
<script>
	export default {
		name: 'images',
		data() {
			return {
                image: [{src:'',index:1}]
                
			}
        },
        mounted() {
            this.image[0].src = this.$route.query.src;
        },
	}
</script>

