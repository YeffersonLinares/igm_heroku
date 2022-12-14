import moment from "moment";
import { Base64 } from 'js-base64';
import axios from "axios";


export default {
    firstCapitalLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    computed: {
        $capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
    },
    methods: {
        $csrf() {
            return document.querySelector("meta[name='csrf-token']").getAttribute('content');
        },
        $cancelButtonColor(color = '#67e567'){
            return color
        },
        $confirmButtonColor(color = '#f99393'){
            return color
        },
        $validacionFormulario(formulario = {}, noValidation = [], clave = '', errorMessage = {}) {
            let exito = true;
            let errors = {};
            for (const key in formulario) {
                errors[clave + key] = [];
                if (!noValidation.includes(key)) {
                    if (!formulario[key]) {
                        exito = false;
                        if (Object.values(errorMessage).length == 0) {
                            errors[clave + key].push("El campo " + key + " es obligatorio");
                        } else {
                            errors[clave + key].push("El campo " + errorMessage[key] + " es obligatorio");
                        }
                    }
                }
            }
            return { exito: exito, errors: errors };
        },
        $encode64(obj) {
            if (obj)
                return Base64.encode(obj)
        },
        $decode64(obj) {
            if (obj)
                return Base64.decode(obj)
        },
        $getUrlPathSegments() {
            return (new URL(window.location.href)).pathname.split('/').filter(Boolean)
        },
        $fechaYhora(fecha = null, formato = false) {
            moment.locale('es');
            if (!fecha) {
                var fecha = moment().format('Y-m-d');
            }
            if (formato) {
                return moment(fecha).format('D MMMM YYYY');
            }
            return moment(fecha).format('D MMMM YYYY , h:mm:ss a');
        },
        $date_time_to_date(fecha = null) {
            if (fecha) {
                return fecha.split(' ')[0]
            }
        },
        $fecha(format = "DD-MM-YYYY") {
            moment.locale('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
            }
            );
            return moment().format(format)
        },
        $numeroconpuntomiles(num = 0) {
            var sign;
            var cents;
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                return num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + '.' +
                    num.substring(num.length - (4 * i + 3));
            console.log((((sign) ? '' : '-') + num));
            return (((sign) ? '' : '-') + num);
        },
        // e= evento,, texo= lo que se escribe, cantidad= lo limitado, sololimitar= 1 (si quiere numeros) null (solo texto)
        $isLetter(e, texto = [], cantidad, soloLimitar = '') {
            // console.log(texto.length+" **** "+cantidad)
            if (texto.length > cantidad) e.preventDefault();
            if (soloLimitar == "") {
                let char = String.fromCharCode(e.keyCode); // Get the character
                if (/^[A-Za-z\s\u00E0-\u00FC-\u0000-\uFFFF]+$/.test(char)) return true;
                // Match with regex
                else e.preventDefault(); // If not match, don't add to input text
            }
        },
        $limitText(data, max_chars) {
            let limite_text = data;
            let limite;
            if (!this.$isEmpty(data)) {
                if (limite_text.length > max_chars) {
                    limite = limite_text.substr(0, max_chars) + " ...";
                    return limite
                }
            }
            return limite_text;
        },
        $solotextoYcarateres(e, texto = [], cantidad) {

            if (texto.length > cantidad) e.preventDefault();
            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[A-Za-z\s]+$/.test(char))
                return true;
            else if (!/^[0-9]+$/.test(char))
                return true;
            else e.preventDefault(); // If not match, don't add to input text
        },
        $isEmpty(val) {
            if (val === undefined || val === null || val === '' || val === "" || val == 'null' || val == 'undefined') {
                return true
            } else {
                return false
            }
        },
        $phonenumber(inputtxt) {
            var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            if (inputtxt.value.match(phoneno)) {
                return true;
            }
            else {
                alert("message");
                return false;
            }
        },

        $phone_number_mask(id) {
            var myMask = "(___) ___-____";
            var myCaja = document.getElementById(id);
            var myText = "";
            var myNumbers = [];
            var myOutPut = ""
            var theLastPos = 1;
            myText = myCaja.value;
            //get numbers
            for (var i = 0; i < myText.length; i++) {
                if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
                    myNumbers.push(myText.charAt(i));
                }
            }
            //write over mask
            for (var j = 0; j < myMask.length; j++) {
                if (myMask.charAt(j) == "_") { //replace "_" by a number
                    if (myNumbers.length == 0)
                        myOutPut = myOutPut + myMask.charAt(j);
                    else {
                        myOutPut = myOutPut + myNumbers.shift();
                        theLastPos = j + 1; //set caret position
                    }
                } else {
                    myOutPut = myOutPut + myMask.charAt(j);
                }
            }
        },
        $isNumber(e, texto = [], cantidad = 20) {
            console.log('numero = ', texto);
            if (texto.length >= cantidad) e.preventDefault();

            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[+0123456789]+$/.test(char)) return true;
            // Match with regex
            else e.preventDefault(); // If not match, don't add to input text
        },
        $isNumberPositivo(evento = null) {
            const teclaPresionada = evento.key;
            const teclaPresionadaEsUnNumero =
                Number.isInteger(parseInt(teclaPresionada));

            const sePresionoUnaTeclaNoAdmitida =
                teclaPresionada != 'ArrowDown' &&
                teclaPresionada != 'ArrowUp' &&
                teclaPresionada != 'ArrowLeft' &&
                teclaPresionada != 'ArrowRight' &&
                teclaPresionada != 'Backspace' &&
                teclaPresionada != 'Delete' &&
                teclaPresionada != 'Enter' &&
                !teclaPresionadaEsUnNumero;
            const comienzaPorCero =
                evento.value.length === 0 &&
                teclaPresionada == 0;

            if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
                evento.preventDefault();
            }
        },
        $num_miles(num = 0) {
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                return num = "0";
            var sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            var cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                    num.substring(num.length - (4 * i + 3));

            // console.log("VALORES",(((sign) ? '' : '-') + num));
            return (((sign) ? '' : '-') + num);

        },
        $numDecimales(e, texto = [], cantidad = 20) {
            // console.log('numero = ',texto);
            if (texto.length >= cantidad) e.preventDefault();

            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[0-9.]+$/.test(char)) return true;
            // Match with regex
            else e.preventDefault(); // If not match, don't add to input text
        },
        $quitarComas(num) {
            num = num.replace(',', '');
            num = num.replace(',', '');
            num = num.replace(',', '');
            num = num.replace(',', '');
            num = num.replace(',', '');
            num = num.replace(',', '');
            return num;
        },
        $esNumero(strNumber) {
            if (strNumber == null) return false;
            if (strNumber == undefined) return false;
            if (typeof strNumber === "number" && !isNaN(strNumber)) return true;
            if (strNumber == "") return false;
            if (strNumber === "") return false;
            var psInt, psFloat;
            psInt = parseInt(strNumber);
            psFloat = parseFloat(strNumber);
            return !isNaN(strNumber) && !isNaN(psFloat);
        },
        $calcularEdad(fecha, fecha_res = null) {
            // Si la fecha es correcta, calculamos la edad

            if (typeof fecha != "string" && fecha && $esNumero(fecha.getTime())) {
                fecha = formatDate(fecha, "yyyy-MM-dd");
            }
            console.log("fecha", fecha);
            var values = fecha.split("-");
            var dia = values[2];
            var mes = values[1];
            var ano = values[0];

            // cogemos los valores actuales
            var fecha_hoy = new Date();
            if (fecha_res != null) fecha_hoy = new Date(fecha_res);
            var ahora_ano = fecha_hoy.getYear();
            var ahora_mes = fecha_hoy.getMonth() + 1;
            var ahora_dia = fecha_hoy.getDate();

            // realizamos el calculo
            var edad = (ahora_ano + 1900) - ano;
            if (ahora_mes < mes) {
                edad--;
            }
            if ((mes == ahora_mes) && (ahora_dia < dia)) {
                edad--;
            }
            if (edad > 1900) {
                edad -= 1900;
            }

            // calculamos los meses
            var meses = 0;

            if (ahora_mes > mes && dia > ahora_dia)
                meses = ahora_mes - mes - 1;
            else if (ahora_mes > mes)
                meses = ahora_mes - mes
            if (ahora_mes < mes && dia < ahora_dia)
                meses = 12 - (mes - ahora_mes);
            else if (ahora_mes < mes)
                meses = 12 - (mes - ahora_mes + 1);
            if (ahora_mes == mes && dia > ahora_dia)
                meses = 11;

            // calculamos los dias
            var dias = 0;
            if (ahora_dia > dia)
                dias = ahora_dia - dia;
            if (ahora_dia < dia) {
                let ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
                dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
            }

            return edad + " a??os, " + meses + " meses y " + dias + " d??as";
        },
        $tabla(tablaId) {
            $("#" + tablaId).DataTable().destroy();
            this.$nextTick(() => {
                $("#" + tablaId).DataTable({
                    //    destroy:true,
                    searching: true,
                    language: {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ning??n dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "??ltimo",
                            "sNext": "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    },
                    initComplete: function () {
                        $("#tabla_contacts_wrapper > .row").addClass("w-100");
                        $("#tabla_contacts_wrapper > .row > .col-xs-12.col-md-6").addClass(
                            "col-lg-6 text-left"
                        );
                        $("#tabla_contacts_wrapper .row")
                            .eq(1)
                            .find(".col-xs-12")
                            .addClass("w-100");
                    },
                });
            });
        },
        $cerrar_modal() {
            $("#editgu").modal("hide");
        },
        $showTabOnModal(btn, target) {
            $('#nav-tabContent a').removeClass('active')
            $('#navstab-up a, .navs-tabContents a, .navs-tabContents button').addClass('inactive')
            $(btn).removeClass('inactive')
            $('#nav-tabContent .tab-pane').removeAttr('style').removeClass('show active')
            $('#nav-tabContent ' + target + '.tab-pane').fadeIn(280, function () { $(this).addClass('show active').removeAttr('style') })
            $('#nav-tabContent a').removeClass('active')
        },
        $asset(path) {
            var base_path = window._asset || '';
            return base_path + path;
        },
        $openModal(modalID) {
            $("#" + modalID).modal("show");
            // var myModal = new bootstrap.Modal(document.getElementById(modalID), {
            //     keyboard: false
            // });
            // myModal.show();
        },
        $closeModal(modalID) {
            $("#" + modalID).modal("hide");
        },
        $parseVillegas(value = '0') {
            let response = parseInt(value).toLocaleString('es-CO')
            if(response) {
                return '$' + response
            }else {
                return '0'
            }
        },
        $alert(response) {
            if (response.status == 200) {
                Swal.fire('??xito', response.msg, 'success')
            } else if (response.status == 500) {
                Swal.fire('Error', response.msg, 'error')
            }else if (response.status == 422) {
                Swal.fire('Error', response.msg, 'error')
            }
        },
        $Unidades(num) {

            switch (num) {
                case 1: return 'UN';
                case 2: return 'DOS';
                case 3: return 'TRES';
                case 4: return 'CUATRO';
                case 5: return 'CINCO';
                case 6: return 'SEIS';
                case 7: return 'SIETE';
                case 8: return 'OCHO';
                case 9: return 'NUEVE';
            }

            return '';
        },//Unidades()

        $Decenas(num) {

            let decena = Math.floor(num / 10);
            let unidad = num - (decena * 10);

            switch (decena) {
                case 1:
                    switch (unidad) {
                        case 0: return 'DIEZ';
                        case 1: return 'ONCE';
                        case 2: return 'DOCE';
                        case 3: return 'TRECE';
                        case 4: return 'CATORCE';
                        case 5: return 'QUINCE';
                        default: return 'DIECI' + $Unidades(unidad);
                    }
                case 2:
                    switch (unidad) {
                        case 0: return 'VEINTE';
                        default: return 'VEINTI' + $Unidades(unidad);
                    }
                case 3: return $DecenasY('TREINTA', unidad);
                case 4: return $DecenasY('CUARENTA', unidad);
                case 5: return $DecenasY('CINCUENTA', unidad);
                case 6: return $DecenasY('SESENTA', unidad);
                case 7: return $DecenasY('SETENTA', unidad);
                case 8: return $DecenasY('OCHENTA', unidad);
                case 9: return $DecenasY('NOVENTA', unidad);
                case 0: return $Unidades(unidad);
            }
        },//Unidades()

        $DecenasY(strSin, numUnidades) {
            if (numUnidades > 0)
                return strSin + ' Y ' + $Unidades(numUnidades)

            return strSin;
        },//DecenasY()

        $Centenas(num) {
            let centenas = Math.floor(num / 100);
            let decenas = num - (centenas * 100);

            switch (centenas) {
                case 1:
                    if (decenas > 0)
                        return 'CIENTO ' + $Decenas(decenas);
                    return 'CIEN';
                case 2: return 'DOSCIENTOS ' + $Decenas(decenas);
                case 3: return 'TRESCIENTOS ' + $Decenas(decenas);
                case 4: return 'CUATROCIENTOS ' + $Decenas(decenas);
                case 5: return 'QUINIENTOS ' + $Decenas(decenas);
                case 6: return 'SEISCIENTOS ' + $Decenas(decenas);
                case 7: return 'SETECIENTOS ' + $Decenas(decenas);
                case 8: return 'OCHOCIENTOS ' + $Decenas(decenas);
                case 9: return 'NOVECIENTOS ' + $Decenas(decenas);
            }

            return $Decenas(decenas);
        },//Centenas()

        $Seccion(num, divisor, strSingular, strPlural) {
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let letras = '';

            if (cientos > 0)
                if (cientos > 1)
                    letras = $Centenas(cientos) + ' ' + strPlural;
                else
                    letras = strSingular;

            if (resto > 0)
                letras += '';

            return letras;
        },//Seccion()

        $Miles(num) {
            let divisor = 1000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let strMiles = $Seccion(num, divisor, 'UN MIL', 'MIL');
            let strCentenas = $Centenas(resto);

            if (strMiles == '')
                return strCentenas;

            return strMiles + ' ' + strCentenas;
        },//Miles()

        $Millones(num) {
            let divisor = 1000000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let strMillones = $Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
            let strMiles = $Miles(resto);

            if (strMillones == '')
                return strMiles;

            return strMillones + ' ' + strMiles;
        },//Millones()

        $NumeroALetras(num, currency) {
            currency = currency || {};
            let data = {
                numero: num,
                enteros: Math.floor(num),
                centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                letrasCentavos: '',
                letrasMonedaPlural: currency.plural || 'Peso',//'PESOS', 'D??lares', 'Bol??vares', 'etcs'
                letrasMonedaSingular: currency.singular || 'Pesos', //'PESO', 'D??lar', 'Bolivar', 'etc'
                letrasMonedaCentavoPlural: currency.centPlural || 'Centavos',
                letrasMonedaCentavoSingular: currency.centSingular || 'Centavo'
            };

            if (data.centavos > 0) {
                data.letrasCentavos = 'CON ' + (function () {
                    if (data.centavos == 1)
                        return $Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                    else
                        return $Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                })();
            };

            if (data.enteros == 0)
                return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            if (data.enteros == 1)
                return $Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
            else
                return $Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        },
        $dv(T) {
            var M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        },
        $validaRut(rutCompleto) {
            if (!/^[0-9]+[-|???]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            var tmp = rutCompleto.split('-');
            var digv = tmp[1];
            var rut = tmp[0];
            if (digv == 'K') digv = 'k';
            return (this.$dv(rut) == digv);
        },
        $random_color(format) {
            var rint = Math.floor(0x100000000 * Math.random());
            switch (format) {
                case 'hex':
                    return '#' + ('00000' + rint.toString(16)).slice(-6).toUpperCase();
                case 'hexa':
                    return '#' + ('0000000' + rint.toString(16)).slice(-8).toUpperCase();
                case 'rgb':
                    return 'rgb(' + (rint & 255) + ',' + (rint >> 8 & 255) + ',' + (rint >> 16 & 255) + ')';
                case 'rgba':
                    return 'rgba(' + (rint & 255) + ',' + (rint >> 8 & 255) + ',' + (rint >> 16 & 255) + ',' + (rint >> 24 & 255) / 255 + ')';
                default:
                    return rint;
            }
        },
        $open_camera() {
            const tieneSoporteUserMedia = () =>
                !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
            const _getUserMedia = (...args) =>
                (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, args);

            // Declaramos elementos del DOM
            const $video = document.querySelector("#video"),
                $estado = document.querySelector("#estado"),
                $listaDeDispositivos = document.querySelector("#listaDeDispositivos");

            const limpiarSelect = () => {
                for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--)
                    $listaDeDispositivos.remove(x);
            };
            const obtenerDispositivos = () => navigator
                .mediaDevices
                .enumerateDevices();

            // La funci??n que es llamada despu??s de que ya se dieron los permisos
            // Lo que hace es llenar el select con los dispositivos obtenidos
            const llenarSelectConDispositivosDisponibles = () => {

                limpiarSelect();
                obtenerDispositivos()
                    .then(dispositivos => {
                        const dispositivosDeVideo = [];
                        dispositivos.forEach(dispositivo => {
                            const tipo = dispositivo.kind;
                            if (tipo === "videoinput") {
                                dispositivosDeVideo.push(dispositivo);
                            }
                        });

                        // Vemos si encontramos alg??n dispositivo, y en caso de que si, entonces llamamos a la funci??n
                        if (dispositivosDeVideo.length > 0) {
                            // Llenar el select
                            dispositivosDeVideo.forEach(dispositivo => {
                                const option = document.createElement('option');
                                option.value = dispositivo.deviceId;
                                option.text = dispositivo.label;
                                $listaDeDispositivos.appendChild(option);
                            });
                        }
                    });
            }

            (function () {
                // Comenzamos viendo si tiene soporte, si no, nos detenemos
                if (!tieneSoporteUserMedia()) {
                    alert("Lo siento. Tu navegador no soporta esta caracter??stica");
                    $estado.innerHTML = "Parece que tu navegador no soporta esta caracter??stica. Intenta actualizarlo.";
                    return;
                }
                //Aqu?? guardaremos el stream globalmente
                let stream;


                // Comenzamos pidiendo los dispositivos
                obtenerDispositivos()
                    .then(dispositivos => {
                        // Vamos a filtrarlos y guardar aqu?? los de v??deo
                        const dispositivosDeVideo = [];

                        // Recorrer y filtrar
                        dispositivos.forEach(function (dispositivo) {
                            const tipo = dispositivo.kind;
                            if (tipo === "videoinput") {
                                dispositivosDeVideo.push(dispositivo);
                            }
                        });

                        // Vemos si encontramos alg??n dispositivo, y en caso de que si, entonces llamamos a la funci??n
                        // y le pasamos el id de dispositivo
                        if (dispositivosDeVideo.length > 0) {
                            // Mostrar stream con el ID del primer dispositivo, luego el usuario puede cambiar
                            mostrarStream(dispositivosDeVideo[0].deviceId);
                        }
                    });



                const mostrarStream = idDeDispositivo => {
                    _getUserMedia({
                        video: {
                            // Justo aqu?? indicamos cu??l dispositivo usar
                            deviceId: idDeDispositivo,
                        }
                    },
                        (streamObtenido) => {
                            // Aqu?? ya tenemos permisos, ahora s?? llenamos el select,
                            // pues si no, no nos dar??a el nombre de los dispositivos
                            llenarSelectConDispositivosDisponibles();

                            // Escuchar cuando seleccionen otra opci??n y entonces llamar a esta funci??n
                            $listaDeDispositivos.onchange = () => {
                                // Detener el stream
                                if (stream) {
                                    stream.getTracks().forEach(function (track) {
                                        track.stop();
                                    });
                                }
                                // Mostrar el nuevo stream con el dispositivo seleccionado
                                mostrarStream($listaDeDispositivos.value);
                            }

                            // Simple asignaci??n
                            stream = streamObtenido;

                            // Mandamos el stream de la c??mara al elemento de v??deo
                            $video.srcObject = stream;
                            $video.play();

                            //Escuchar el click del bot??n para tomar la foto
                            //Escuchar el click del bot??n para tomar la foto
                        }, (error) => {
                            console.log("Permiso denegado o error: ", error);
                            $estado.innerHTML = "No se puede acceder a la c??mara, o no diste permiso.";
                        });
                }
            })();
        },
    },

    mounted() {
        /*console.log('Component has been mounted!');*/
    },
    created() {
        /*console.log('Component has been created!');*/
    }
}
