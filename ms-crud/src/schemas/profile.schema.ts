import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true, // Se agrega la fecha de creacion y actualizacion de los registros: createdAt y updatedAt
})
export class Profile {
  @Prop() // Propiedad de la base de datos
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    required: true,
    unique: true,    // El correo debe ser unico en la base de datos
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo electronico valido'],  // Validacion de correo electronico
  })
  email: string;

  @Prop()
  cellPhone: string;

  @Prop()
  address: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile); // Se crea el esquema de la base de datos