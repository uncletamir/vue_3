<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Data Buku</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="kategori_id" class="font-weight-bold">Kode Buku</label>
                                <input type="text" class="form-control" v-model="buku.kategori_id" placeholder="Masukkan Kode Kategori Buku">
                                <!-- validation -->
                                <div v-if="validation.kategori_id" class="mt-2 alert alert-danger">
                                    {{ validation.kategori_id[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="judul_buku" class="font-weight-bold">Judul Buku</label>
                                <input type="text" class="form-control" v-model="buku.judul_buku" placeholder="Masukkan Judul Buku">
                                <!-- validation -->
                                <div v-if="validation.judul_buku" class="mt-2 alert alert-danger">
                                    {{ validation.judul_buku[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="penerbit_buku" class="font-weight-bold">Penerbit Buku</label>
                                <input type="text" class="form-control" v-model="buku.penerbit_buku" placeholder="Masukkan Penerbit Buku">
                                <!-- validation -->
                                <div v-if="validation.penerbit_buku" class="mt-2 alert alert-danger">
                                    {{ validation.penerbit_buku[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="pengarang_buku" class="font-weight-bold">Pengarang Buku</label>
                                <input type="text" class="form-control" v-model="buku.pengarang_buku" placeholder="Masukkan Pengarang Buku">
                                <!-- validation -->
                                <div v-if="validation.pengarang_buku" class="mt-2 alert alert-danger">
                                    {{ validation.pengarang_buku[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tahun" class="font-weight-bold">Tahun Buku</label>
                                <input type="text" class="form-control" v-model="buku.tahun" placeholder="Masukkan Tahun Buku">
                                <!-- validation -->
                                <div v-if="validation.tahun" class="mt-2 alert alert-danger">
                                    {{ validation.tahun[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const buku = reactive({
            kategori_id:'',
            judul_buku:'',
            penerbit_buku:'',
            pengarang_buku:'',
            tahun:'',
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:3000/api/buku/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              buku.kategori_id  = response.data.data.kategori_id
              buku.judul_buku   = response.data.data.judul_buku
              buku.pengarang_buku   = response.data.data.pengarang_buku
              buku.penerbit_buku    = response.data.data.penerbit_buku
              buku.tahun    = response.data.data.tahun
 

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let kategori_id = buku.kategori_id
            let judul_buku = buku.judul_buku
            let penerbit_buku = buku.penerbit_buku
            let pengarang_buku = buku.pengarang_buku
            let tahun = buku.tahun

            axios.put(`http://localhost:3000/api/buku/${route.params.id}`, {
                kategori_id: kategori_id,
                judul_buku: judul_buku,
                penerbit_buku: penerbit_buku,
                pengarang_buku: pengarang_buku,
                tahun: tahun
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'buku.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            buku,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>