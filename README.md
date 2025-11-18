# Proyecto gramaticas y lenguajes

## Eleccion del regex

Para este proyecto escogimos el siguiente regex: ***^\d{4}$ | ^\d{6}$***  

Esta expresión regular se interpreta de la siguiente manera:

- **\d** : representa cualquier dígito del 0 al 9.  
- **{4}** y **{6}** : indican que deben existir exactamente 4 o 6 dígitos consecutivos.  
- **|** : corresponde a un operador lógico **OR**, que establece una alternativa entre dos patrones.  
- **^** y **$** : delimitan el inicio y el final de la cadena, asegurando que no existan caracteres adicionales.

En conjunto, esta expresión regular describe un **código numérico (PIN)** compuesto por **4 o 6 dígitos exactos**.

Este patrón fue elegido debido a que:

- Representa un caso de validación común en sistemas reales (por ejemplo, códigos PIN o claves numéricas).  
- El autómata finito determinista (AFD) correspondiente es sencillo de construir y analizar.  
- Permite visualizar de manera clara la existencia de dos estados de aceptación (q4 y q6).  
- Su traducción a una Máquina de Turing es directa, principalmente porque consiste en verificar la cantidad de dígitos.

## AFD

De lo anterior explicado, tenemos aqui el **AFD** que representea dicha expresión regular o regex:  

<img width="848" height="111" alt="AFD" src="https://github.com/user-attachments/assets/96a76c2f-86d5-42e6-a0da-d9086461e6f8" />  

## Máquina de turing

De este AFD tenemos su septi-tupla para la cosntrucción de la MT definida como :  
1. **Estados (Q)** = {q0, q1, q2, q3, q4, q5, q6, qaccept, qreject}
2. **Alfabeto (Σ)** = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}  
3. **Alfabeto de cinta (Γ)** = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, _}  
4. **Estado inicial (q0)** = q0
5. **Estados de acpetación (F)** = {q4, q6}
6. **Estados de rechazo (R)** = {q0, q1, q2, q3, q5}  
7. **Transiciones (δ)**  
<table>
  <tr> <th>Estado</th> <th>Lee</th> <th>Escribe</th> <th>Mueve</th> <th>Va a</th>     </tr>
  <tr> <td>q0</td>     <td>d</td>   <td>d</td>       <td>R</td>     <td>q1</td>       </tr>
  <tr> <td>q1</td>     <td>d</td>   <td>d</td>       <td>R</td>     <td>q2</td>       </tr>
  <tr> <td>q2</td>     <td>d</td>   <td>d</td>       <td>R</td>     <td>q3</td>       </tr>
  <tr> <td>q3</td>     <td>d</td>   <td>d</td>       <td>R</td>     <td>q4</td>       </tr>
  <tr> <td>q4</td>     <td>d</td>   <td>d</td>       <td>R</td>     <td>q5</td>       </tr>
  <tr> <td>q4</td>     <td>_</td>   <td>_</td>       <td>S</td>     <td>qaccept</td>  </tr>
  <tr> <td>q5</td>     <td>d</td>   <td>d</td>       <td>R</td>     <td>q6</td>       </tr>
  <tr> <td>q6</td>     <td>d</td>   <td>d</td>       <td>R</td>     <td>qreject</td>  </tr>
  <tr> <td>q6</td>     <td>_</td>   <td>_</td>       <td>S</td>     <td>qaccept</td>  </tr>
</table>    

