<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Buku</h4>
                        <hr>
                        <router-link :to="{name: 'buku.create'}" class="btn btn-md btn-success">Tambah Buku</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Kode Buku</th>
                                    <th scope="col">Judul Buku</th>
                                    <th scope="col">Pengarang Buku</th>
                                    <th scope="col">Penerbit Buku</th>
                                    <th scope="col">Tahun Buku</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(buku, index) in bukus" :key="index">
                                    <td>{{ buku.kategori_id }}</td>
                                    <td>{{ buku.judul_buku }}</td>
                                    <td>{{ buku.pengarang_buku }}</td>
                                    <td>{{ buku.penerbit_buku }}</td>
                                    <td>{{ buku.tahun }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'buku.edit', params:{id: buku.id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="bukusDelete(buku.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

    setup() {

        //reactive state
        let bukus = ref([])

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get('http://localhost:3000/api/buku')
            .then(response => {
              
              //assign state posts with response data
              bukus.value = response.data.data

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method delete
        function bukusDelete(id) {
                    
        //delete data post by ID
        axios.delete(`http://localhost:3000/api/buku/${id}`)
        .then(() => {
                    
            //splice posts 
            bukus.value.splice(bukus.value.indexOf(id), 1);

            }).catch(error => {
                console.log(error.response.data)
            })

        }

        //return
        return {
            bukus,
            bukusDelete
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>