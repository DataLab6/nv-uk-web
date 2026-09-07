# PQRS: envio y radicacion

## Decision implementada

Ambas marcas usan PqrsPage, PqrsFilingPage y handlePqrsRequest compartidos. La relacion (Cliente, Proveedor, Otro) es independiente de la identidad legal (natural, juridica, apoderado). Se conservan identificacion, contacto, representacion y autorizaciones. Se elimina Objeto/Objetivo de la solicitud; Hechos y razones es el unico relato extenso.

Los tipos son Peticion, Queja, Reclamo y Solicitud (con tildes en interfaz). Cada variante cambia la etiqueta del motivo y la orientacion del relato. El motivo es texto libre obligatorio, no una lista de causales oficiales. No se encontro un estudio ni un catalogo aprobado de Servicio al Cliente en las fuentes revisadas. No se atribuye aprobacion a las orientaciones implementadas ni se impide enviar por falta de catalogo.

Propuesta PARA VALIDACION, no desplegada como catalogo: Peticion: informacion/orientacion; Queja: atencion/trato; Reclamo: producto/entrega/facturacion; Solicitud: gestion documental/tramite. Servicio al Cliente debe definir alcance, codigos, diferencias Peticion/Solicitud, pertinencia por cliente/proveedor/otro, responsable y version del catalogo. Conservar siempre motivo libre para casos no clasificados; no exigir factura ni datos comerciales desconocidos para recibir una PQRS.

## Estado real

El endpoint envia por Resend al destinatario configurado por marca; no hay registro de expediente, consulta de estado, acuse automatico al solicitante ni radicado persistido. HTTP 200 significa aceptacion del envio por el proveedor de correo, no entrega confirmada, lectura ni radicacion oficial. La interfaz lo explica y no genera numeros aleatorios. Los indicadores de disponibilidad existentes se respetan.

El correo incluye marca, relacion, tipo, motivo declarado libre, identidad activa, contacto, relato, anexos y declaraciones. Se excluyen identidades de ramas inactivas y se escapa HTML. El token de Turnstile se recoge del bloque de revision y se verifica en servidor. Validacion compartida controla opciones, campos, limites y autorizaciones tanto antes de revisar/enviar como en servidor. El servidor sigue siendo autoritativo para adjuntos.

Revisar antes de produccion RESEND_PQRS_TO_LA_NIEVE y RESEND_PQRS_TO_UNIMARKA: el mecanismo existente permite destinatario de pruebas y fallback. Aprobar remitente/dominio, responsables, seguridad, retencion y terminos juridicos. No se alteraron configuraciones ajenas ni se conecto una BD exploratoria.

## Propuesta persistente

No basta un UUID, un consecutivo en memoria, localStorage, un archivo local del servidor ni el ID de Resend. La consulta del codigo debe resolver un registro durable bajo control de la empresa.

1. Elegir sistema oficial: gestor documental/CRM con API de radicacion, preferible si ya existe; alternativamente almacenamiento transaccional administrado aprobado. No reutilizar credenciales ni bases exploratorias.
2. Registrar expediente con ID interno, marca, radicado unico, fecha del servidor, relacion, tipo, motivo, relato, identidad/contacto necesarios, version de consentimientos y estado. Definir unicidad global o por marca/anio y secuencia atomica segun reglas juridicas. Radicado solo se devuelve despues del commit.
3. Guardar anexos en almacenamiento privado con metadatos, hash, analisis antimalware y politica de retencion. No usar URLs publicas. Coordinar subidas temporales y limpieza si falla la transaccion.
4. Persistir expediente y evento de notificacion (outbox) en la misma transaccion. Enviar correo desde un trabajador con reintentos; fallo de correo no debe eliminar el expediente ni cambiar el radicado. Guardar IDs del proveedor y estados de entrega por webhook verificado.
5. Usar clave de idempotencia por intento con restriccion unica y hash del contenido; reintentos identicos devuelven el mismo expediente, contenido distinto con la misma clave se rechaza. Prevenir duplicados por doble clic, timeout o reenvio de red.
6. Emitir acuse al solicitante con radicado y fecha, sin documentos sensibles innecesarios. Consulta autenticada o mediante token secreto separado del consecutivo; autorizacion por expediente y marca, auditoria de accesos y cambios de estado.

Pendientes: propietario del servicio, sistema y contrato de persistencia, formato/numeracion, tratamiento de anonimos/incompletos, plazos legales (hay discrepancias historicas documentadas), catalogo aprobado, roles de gestion, retencion/borrado, cifrado, residencia de datos, backups/restauracion, monitoreo y pruebas de recuperacion. No se implementa persistencia hasta aprobar estas decisiones.

## Verificacion

`node scripts/verify-pqrs.mjs` ejecuta modulos TypeScript aislados con correo y Turnstile simulados: ambas marcas, cuatro tipos, tres relaciones, identidades condicionales, rechazos de validacion, escape HTML, ausencia de objeto/radicado, adjuntos y fallo de correo. No lee secretos ni usa servicios externos. Complementar con typecheck y lint de archivos propios, sin build.

Pendiente prueba visual desktop/movil, Turnstile real, entrega de correo y operacion de atencion con destinatarios aprobados. La aceptacion simulada de Resend no prueba entrega real.
