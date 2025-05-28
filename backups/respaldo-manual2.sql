--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: FarmaNova; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "FarmaNova";


ALTER SCHEMA "FarmaNova" OWNER TO postgres;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Estado; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Estado" AS ENUM (
    'PENDIENTE',
    'EN_PROCESO',
    'COMPLETADO'
);


ALTER TYPE public."Estado" OWNER TO postgres;

--
-- Name: EstadoMedicamento; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."EstadoMedicamento" AS ENUM (
    'DISPONIBLE',
    'PROXIMO_A_AGOTARSE',
    'AGOTADO'
);


ALTER TYPE public."EstadoMedicamento" OWNER TO postgres;

--
-- Name: EstadoMedicamentoExpirado; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."EstadoMedicamentoExpirado" AS ENUM (
    'PROXIMO_A_EXPIRAR',
    'EXPIRADO',
    'DISPONIBLE'
);


ALTER TYPE public."EstadoMedicamentoExpirado" OWNER TO postgres;

--
-- Name: Rol; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Rol" AS ENUM (
    'ADMINISTRADOR',
    'EMPLEADO'
);


ALTER TYPE public."Rol" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova"._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE "FarmaNova"._prisma_migrations OWNER TO postgres;

--
-- Name: categoriamedicamentos; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".categoriamedicamentos (
    catmed_pk integer NOT NULL,
    medicamento_fk integer NOT NULL,
    categoria_fk integer NOT NULL
);


ALTER TABLE "FarmaNova".categoriamedicamentos OWNER TO postgres;

--
-- Name: categoriamedicamentos_catmed_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".categoriamedicamentos_catmed_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".categoriamedicamentos_catmed_pk_seq OWNER TO postgres;

--
-- Name: categoriamedicamentos_catmed_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".categoriamedicamentos_catmed_pk_seq OWNED BY "FarmaNova".categoriamedicamentos.catmed_pk;


--
-- Name: cateogoria; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".cateogoria (
    categoria_pk integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE "FarmaNova".cateogoria OWNER TO postgres;

--
-- Name: cateogoria_categoria_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".cateogoria_categoria_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".cateogoria_categoria_pk_seq OWNER TO postgres;

--
-- Name: cateogoria_categoria_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".cateogoria_categoria_pk_seq OWNED BY "FarmaNova".cateogoria.categoria_pk;


--
-- Name: cliente; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".cliente (
    cliente_pk integer NOT NULL,
    nombrecompleto character varying(50) NOT NULL,
    telefono character varying(10) NOT NULL,
    usuario_fk integer NOT NULL
);


ALTER TABLE "FarmaNova".cliente OWNER TO postgres;

--
-- Name: cliente_cliente_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".cliente_cliente_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".cliente_cliente_pk_seq OWNER TO postgres;

--
-- Name: cliente_cliente_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".cliente_cliente_pk_seq OWNED BY "FarmaNova".cliente.cliente_pk;


--
-- Name: detallesventa; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".detallesventa (
    detallesventa_pk integer NOT NULL,
    cantidad integer NOT NULL,
    ventas_fk integer NOT NULL,
    medicamentos_fk integer NOT NULL
);


ALTER TABLE "FarmaNova".detallesventa OWNER TO postgres;

--
-- Name: detallesventa_detallesventa_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".detallesventa_detallesventa_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".detallesventa_detallesventa_pk_seq OWNER TO postgres;

--
-- Name: detallesventa_detallesventa_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".detallesventa_detallesventa_pk_seq OWNED BY "FarmaNova".detallesventa.detallesventa_pk;


--
-- Name: distribuidor; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".distribuidor (
    distribuidor_pk integer NOT NULL,
    nombrecompleto character varying(50) NOT NULL,
    telefono character varying(10) NOT NULL
);


ALTER TABLE "FarmaNova".distribuidor OWNER TO postgres;

--
-- Name: distribuidor_distribuidor_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".distribuidor_distribuidor_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".distribuidor_distribuidor_pk_seq OWNER TO postgres;

--
-- Name: distribuidor_distribuidor_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".distribuidor_distribuidor_pk_seq OWNED BY "FarmaNova".distribuidor.distribuidor_pk;


--
-- Name: distribuidormedicamento; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".distribuidormedicamento (
    dismedicamento_pk integer NOT NULL,
    fecha_expiracion date NOT NULL,
    cantidadcompra integer NOT NULL,
    medicamento_fk integer NOT NULL,
    distribuidor_fk integer NOT NULL
);


ALTER TABLE "FarmaNova".distribuidormedicamento OWNER TO postgres;

--
-- Name: distribuidormedicamento_dismedicamento_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".distribuidormedicamento_dismedicamento_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".distribuidormedicamento_dismedicamento_pk_seq OWNER TO postgres;

--
-- Name: distribuidormedicamento_dismedicamento_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".distribuidormedicamento_dismedicamento_pk_seq OWNED BY "FarmaNova".distribuidormedicamento.dismedicamento_pk;


--
-- Name: empleado; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".empleado (
    empleado_pk integer NOT NULL,
    nombrecompleto character varying(20) NOT NULL,
    usuario_fk integer NOT NULL
);


ALTER TABLE "FarmaNova".empleado OWNER TO postgres;

--
-- Name: empleado_empleado_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".empleado_empleado_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".empleado_empleado_pk_seq OWNER TO postgres;

--
-- Name: empleado_empleado_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".empleado_empleado_pk_seq OWNED BY "FarmaNova".empleado.empleado_pk;


--
-- Name: medicamentos; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".medicamentos (
    medicamento_pk integer NOT NULL,
    nombre character varying(50) NOT NULL,
    precio real,
    tama_o character varying(30) NOT NULL,
    presentacion_fk integer NOT NULL,
    cantidaddisponible integer NOT NULL
);


ALTER TABLE "FarmaNova".medicamentos OWNER TO postgres;

--
-- Name: medicamentos_medicamento_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".medicamentos_medicamento_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".medicamentos_medicamento_pk_seq OWNER TO postgres;

--
-- Name: medicamentos_medicamento_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".medicamentos_medicamento_pk_seq OWNED BY "FarmaNova".medicamentos.medicamento_pk;


--
-- Name: presentacion; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".presentacion (
    presentacion_pk integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE "FarmaNova".presentacion OWNER TO postgres;

--
-- Name: presentacion_presentacion_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".presentacion_presentacion_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".presentacion_presentacion_pk_seq OWNER TO postgres;

--
-- Name: presentacion_presentacion_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".presentacion_presentacion_pk_seq OWNED BY "FarmaNova".presentacion.presentacion_pk;


--
-- Name: rol; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".rol (
    rol_pk integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE "FarmaNova".rol OWNER TO postgres;

--
-- Name: rol_rol_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".rol_rol_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".rol_rol_pk_seq OWNER TO postgres;

--
-- Name: rol_rol_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".rol_rol_pk_seq OWNED BY "FarmaNova".rol.rol_pk;


--
-- Name: usuario; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".usuario (
    usuario_pk integer NOT NULL,
    fechacreacion date NOT NULL,
    correo character varying(30) NOT NULL,
    contrase_a character varying(20) NOT NULL,
    rol_fk integer NOT NULL
);


ALTER TABLE "FarmaNova".usuario OWNER TO postgres;

--
-- Name: usuario_usuario_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".usuario_usuario_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".usuario_usuario_pk_seq OWNER TO postgres;

--
-- Name: usuario_usuario_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".usuario_usuario_pk_seq OWNED BY "FarmaNova".usuario.usuario_pk;


--
-- Name: ventas; Type: TABLE; Schema: FarmaNova; Owner: postgres
--

CREATE TABLE "FarmaNova".ventas (
    ventas_pk integer NOT NULL,
    fechaventa date NOT NULL,
    empleado_fk integer NOT NULL,
    cliente_fk integer NOT NULL
);


ALTER TABLE "FarmaNova".ventas OWNER TO postgres;

--
-- Name: ventas_ventas_pk_seq; Type: SEQUENCE; Schema: FarmaNova; Owner: postgres
--

CREATE SEQUENCE "FarmaNova".ventas_ventas_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "FarmaNova".ventas_ventas_pk_seq OWNER TO postgres;

--
-- Name: ventas_ventas_pk_seq; Type: SEQUENCE OWNED BY; Schema: FarmaNova; Owner: postgres
--

ALTER SEQUENCE "FarmaNova".ventas_ventas_pk_seq OWNED BY "FarmaNova".ventas.ventas_pk;


--
-- Name: Devoluciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Devoluciones" (
    devoluciones_pk integer NOT NULL,
    descripcion character varying(150) NOT NULL,
    cantidad integer NOT NULL,
    medicamento_fk integer NOT NULL
);


ALTER TABLE public."Devoluciones" OWNER TO postgres;

--
-- Name: Devoluciones_devoluciones_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Devoluciones_devoluciones_pk_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Devoluciones_devoluciones_pk_seq" OWNER TO postgres;

--
-- Name: Devoluciones_devoluciones_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Devoluciones_devoluciones_pk_seq" OWNED BY public."Devoluciones".devoluciones_pk;


--
-- Name: FormaFarmaceutica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FormaFarmaceutica" (
    "formaFarmaceutica_pk" integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."FormaFarmaceutica" OWNER TO postgres;

--
-- Name: FormaFarmaceutica_formaFarmaceutica_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FormaFarmaceutica_formaFarmaceutica_pk_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FormaFarmaceutica_formaFarmaceutica_pk_seq" OWNER TO postgres;

--
-- Name: FormaFarmaceutica_formaFarmaceutica_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FormaFarmaceutica_formaFarmaceutica_pk_seq" OWNED BY public."FormaFarmaceutica"."formaFarmaceutica_pk";


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: accionTera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."accionTera" (
    "accionTerapeutica_pk" integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public."accionTera" OWNER TO postgres;

--
-- Name: accionTera_accionTerapeutica_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."accionTera_accionTerapeutica_pk_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."accionTera_accionTerapeutica_pk_seq" OWNER TO postgres;

--
-- Name: accionTera_accionTerapeutica_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."accionTera_accionTerapeutica_pk_seq" OWNED BY public."accionTera"."accionTerapeutica_pk";


--
-- Name: accionmedicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accionmedicamentos (
    catmed_pk integer NOT NULL,
    "accionTerapeutica_fk" integer NOT NULL,
    medicamento_fk integer NOT NULL
);


ALTER TABLE public.accionmedicamentos OWNER TO postgres;

--
-- Name: accionmedicamentos_catmed_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accionmedicamentos_catmed_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accionmedicamentos_catmed_pk_seq OWNER TO postgres;

--
-- Name: accionmedicamentos_catmed_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accionmedicamentos_catmed_pk_seq OWNED BY public.accionmedicamentos.catmed_pk;


--
-- Name: detallespedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detallespedidos (
    detallespedidos_pk integer NOT NULL,
    fecha_expiracion date NOT NULL,
    cantidad integer NOT NULL,
    pedidos_fk integer NOT NULL,
    precioventa real NOT NULL,
    medicamento_fk integer NOT NULL
);


ALTER TABLE public.detallespedidos OWNER TO postgres;

--
-- Name: detallespedidos_detallespedidos_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detallespedidos_detallespedidos_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallespedidos_detallespedidos_pk_seq OWNER TO postgres;

--
-- Name: detallespedidos_detallespedidos_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallespedidos_detallespedidos_pk_seq OWNED BY public.detallespedidos.detallespedidos_pk;


--
-- Name: detallesventa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detallesventa (
    detallesventa_pk integer NOT NULL,
    cantidad integer NOT NULL,
    ventas_fk integer NOT NULL,
    medicamento_fk integer NOT NULL
);


ALTER TABLE public.detallesventa OWNER TO postgres;

--
-- Name: detallesventa_detallesventa_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detallesventa_detallesventa_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallesventa_detallesventa_pk_seq OWNER TO postgres;

--
-- Name: detallesventa_detallesventa_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallesventa_detallesventa_pk_seq OWNED BY public.detallesventa.detallesventa_pk;


--
-- Name: distribuidor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.distribuidor (
    distribuidor_pk integer NOT NULL,
    nombrecompleto character varying(50) NOT NULL,
    telefono character varying(10) NOT NULL,
    empresa_fk integer NOT NULL
);


ALTER TABLE public.distribuidor OWNER TO postgres;

--
-- Name: distribuidor_distribuidor_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.distribuidor_distribuidor_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.distribuidor_distribuidor_pk_seq OWNER TO postgres;

--
-- Name: distribuidor_distribuidor_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.distribuidor_distribuidor_pk_seq OWNED BY public.distribuidor.distribuidor_pk;


--
-- Name: empleado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleado (
    empleado_pk integer NOT NULL,
    nombrecompleto character varying(20) NOT NULL,
    usuario_fk integer NOT NULL
);


ALTER TABLE public.empleado OWNER TO postgres;

--
-- Name: empleado_empleado_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleado_empleado_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleado_empleado_pk_seq OWNER TO postgres;

--
-- Name: empleado_empleado_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleado_empleado_pk_seq OWNED BY public.empleado.empleado_pk;


--
-- Name: empresa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empresa (
    empresa_pk integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.empresa OWNER TO postgres;

--
-- Name: empresa_empresa_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empresa_empresa_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empresa_empresa_pk_seq OWNER TO postgres;

--
-- Name: empresa_empresa_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empresa_empresa_pk_seq OWNED BY public.empresa.empresa_pk;


--
-- Name: medicamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicamento (
    imagen text,
    medicamento_pk integer NOT NULL,
    "codigoBarra" text,
    "requierePrescripcion" boolean DEFAULT false NOT NULL,
    "EstadoMedicamento" public."EstadoMedicamento" NOT NULL,
    "EstadoMedicamentoExpirado" public."EstadoMedicamentoExpirado" NOT NULL,
    forma_fk integer NOT NULL,
    "precioVenta" numeric(65,30) DEFAULT 0.00 NOT NULL,
    "cantidadMinima" integer DEFAULT 0 NOT NULL,
    "cantidadMaxima" integer DEFAULT 0 NOT NULL,
    via text NOT NULL,
    "fechaCreacion" date,
    "fechaModificacion" date,
    stock integer DEFAULT 0 NOT NULL,
    descripcion text NOT NULL,
    "precioCompra" numeric(65,30) DEFAULT 0.00 NOT NULL,
    empresa_fk integer NOT NULL
);


ALTER TABLE public.medicamento OWNER TO postgres;

--
-- Name: medicamentoSintoma; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."medicamentoSintoma" (
    "medicaSintoma" integer NOT NULL,
    medicamento_fk integer NOT NULL,
    sintomas_fk integer NOT NULL
);


ALTER TABLE public."medicamentoSintoma" OWNER TO postgres;

--
-- Name: medicamentoSintoma_medicaSintoma_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."medicamentoSintoma_medicaSintoma_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."medicamentoSintoma_medicaSintoma_seq" OWNER TO postgres;

--
-- Name: medicamentoSintoma_medicaSintoma_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."medicamentoSintoma_medicaSintoma_seq" OWNED BY public."medicamentoSintoma"."medicaSintoma";


--
-- Name: medicamento_medicamento_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicamento_medicamento_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medicamento_medicamento_pk_seq OWNER TO postgres;

--
-- Name: medicamento_medicamento_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicamento_medicamento_pk_seq OWNED BY public.medicamento.medicamento_pk;


--
-- Name: pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos (
    pedidos_pk integer NOT NULL,
    "fechaPedido" date NOT NULL,
    empleado_fk integer NOT NULL,
    distribuidor_fk integer NOT NULL,
    estado public."Estado" NOT NULL,
    "fechaEntrega" date
);


ALTER TABLE public.pedidos OWNER TO postgres;

--
-- Name: pedidos_pedidos_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedidos_pedidos_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_pedidos_pk_seq OWNER TO postgres;

--
-- Name: pedidos_pedidos_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedidos_pedidos_pk_seq OWNED BY public.pedidos.pedidos_pk;


--
-- Name: sintomas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sintomas (
    sintoma_pk integer NOT NULL,
    descripcion text NOT NULL
);


ALTER TABLE public.sintomas OWNER TO postgres;

--
-- Name: sintomas_sintoma_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sintomas_sintoma_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sintomas_sintoma_pk_seq OWNER TO postgres;

--
-- Name: sintomas_sintoma_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sintomas_sintoma_pk_seq OWNED BY public.sintomas.sintoma_pk;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    usuario_pk integer NOT NULL,
    fechacreacion date NOT NULL,
    correo character varying(30) NOT NULL,
    contrase_a character varying(20) NOT NULL,
    rol public."Rol" NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_usuario_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_usuario_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_usuario_pk_seq OWNER TO postgres;

--
-- Name: usuario_usuario_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_usuario_pk_seq OWNED BY public.usuario.usuario_pk;


--
-- Name: ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas (
    ventas_pk integer NOT NULL,
    fechaventa date NOT NULL,
    empleado_fk integer NOT NULL,
    estado public."Estado" NOT NULL,
    "pagaCon" real NOT NULL,
    total real DEFAULT 0.00 NOT NULL
);


ALTER TABLE public.ventas OWNER TO postgres;

--
-- Name: ventas_ventas_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_ventas_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_ventas_pk_seq OWNER TO postgres;

--
-- Name: ventas_ventas_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_ventas_pk_seq OWNED BY public.ventas.ventas_pk;


--
-- Name: categoriamedicamentos catmed_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".categoriamedicamentos ALTER COLUMN catmed_pk SET DEFAULT nextval('"FarmaNova".categoriamedicamentos_catmed_pk_seq'::regclass);


--
-- Name: cateogoria categoria_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".cateogoria ALTER COLUMN categoria_pk SET DEFAULT nextval('"FarmaNova".cateogoria_categoria_pk_seq'::regclass);


--
-- Name: cliente cliente_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".cliente ALTER COLUMN cliente_pk SET DEFAULT nextval('"FarmaNova".cliente_cliente_pk_seq'::regclass);


--
-- Name: detallesventa detallesventa_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".detallesventa ALTER COLUMN detallesventa_pk SET DEFAULT nextval('"FarmaNova".detallesventa_detallesventa_pk_seq'::regclass);


--
-- Name: distribuidor distribuidor_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".distribuidor ALTER COLUMN distribuidor_pk SET DEFAULT nextval('"FarmaNova".distribuidor_distribuidor_pk_seq'::regclass);


--
-- Name: distribuidormedicamento dismedicamento_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".distribuidormedicamento ALTER COLUMN dismedicamento_pk SET DEFAULT nextval('"FarmaNova".distribuidormedicamento_dismedicamento_pk_seq'::regclass);


--
-- Name: empleado empleado_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".empleado ALTER COLUMN empleado_pk SET DEFAULT nextval('"FarmaNova".empleado_empleado_pk_seq'::regclass);


--
-- Name: medicamentos medicamento_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".medicamentos ALTER COLUMN medicamento_pk SET DEFAULT nextval('"FarmaNova".medicamentos_medicamento_pk_seq'::regclass);


--
-- Name: presentacion presentacion_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".presentacion ALTER COLUMN presentacion_pk SET DEFAULT nextval('"FarmaNova".presentacion_presentacion_pk_seq'::regclass);


--
-- Name: rol rol_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".rol ALTER COLUMN rol_pk SET DEFAULT nextval('"FarmaNova".rol_rol_pk_seq'::regclass);


--
-- Name: usuario usuario_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".usuario ALTER COLUMN usuario_pk SET DEFAULT nextval('"FarmaNova".usuario_usuario_pk_seq'::regclass);


--
-- Name: ventas ventas_pk; Type: DEFAULT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".ventas ALTER COLUMN ventas_pk SET DEFAULT nextval('"FarmaNova".ventas_ventas_pk_seq'::regclass);


--
-- Name: Devoluciones devoluciones_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devoluciones" ALTER COLUMN devoluciones_pk SET DEFAULT nextval('public."Devoluciones_devoluciones_pk_seq"'::regclass);


--
-- Name: FormaFarmaceutica formaFarmaceutica_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FormaFarmaceutica" ALTER COLUMN "formaFarmaceutica_pk" SET DEFAULT nextval('public."FormaFarmaceutica_formaFarmaceutica_pk_seq"'::regclass);


--
-- Name: accionTera accionTerapeutica_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."accionTera" ALTER COLUMN "accionTerapeutica_pk" SET DEFAULT nextval('public."accionTera_accionTerapeutica_pk_seq"'::regclass);


--
-- Name: accionmedicamentos catmed_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accionmedicamentos ALTER COLUMN catmed_pk SET DEFAULT nextval('public.accionmedicamentos_catmed_pk_seq'::regclass);


--
-- Name: detallespedidos detallespedidos_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallespedidos ALTER COLUMN detallespedidos_pk SET DEFAULT nextval('public.detallespedidos_detallespedidos_pk_seq'::regclass);


--
-- Name: detallesventa detallesventa_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallesventa ALTER COLUMN detallesventa_pk SET DEFAULT nextval('public.detallesventa_detallesventa_pk_seq'::regclass);


--
-- Name: distribuidor distribuidor_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distribuidor ALTER COLUMN distribuidor_pk SET DEFAULT nextval('public.distribuidor_distribuidor_pk_seq'::regclass);


--
-- Name: empleado empleado_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado ALTER COLUMN empleado_pk SET DEFAULT nextval('public.empleado_empleado_pk_seq'::regclass);


--
-- Name: empresa empresa_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa ALTER COLUMN empresa_pk SET DEFAULT nextval('public.empresa_empresa_pk_seq'::regclass);


--
-- Name: medicamento medicamento_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamento ALTER COLUMN medicamento_pk SET DEFAULT nextval('public.medicamento_medicamento_pk_seq'::regclass);


--
-- Name: medicamentoSintoma medicaSintoma; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."medicamentoSintoma" ALTER COLUMN "medicaSintoma" SET DEFAULT nextval('public."medicamentoSintoma_medicaSintoma_seq"'::regclass);


--
-- Name: pedidos pedidos_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN pedidos_pk SET DEFAULT nextval('public.pedidos_pedidos_pk_seq'::regclass);


--
-- Name: sintomas sintoma_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sintomas ALTER COLUMN sintoma_pk SET DEFAULT nextval('public.sintomas_sintoma_pk_seq'::regclass);


--
-- Name: usuario usuario_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN usuario_pk SET DEFAULT nextval('public.usuario_usuario_pk_seq'::regclass);


--
-- Name: ventas ventas_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas ALTER COLUMN ventas_pk SET DEFAULT nextval('public.ventas_ventas_pk_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova"._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a6978525-708b-49e6-b146-bbb67a87bd00	f00f8f49e6c24616a56c6f71ea74b18b139875f567a2363f1376a76aec1d2675	2025-03-23 03:21:45.960498+00	20250319185712_migration	\N	\N	2025-03-23 03:21:45.91947+00	1
\.


--
-- Data for Name: categoriamedicamentos; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".categoriamedicamentos (catmed_pk, medicamento_fk, categoria_fk) FROM stdin;
\.


--
-- Data for Name: cateogoria; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".cateogoria (categoria_pk, descripcion) FROM stdin;
7	Analgésicos
8	Antibióticos
9	Analgésicos
10	Antibióticos
11	Analgésicos
12	Antibióticos
\.


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".cliente (cliente_pk, nombrecompleto, telefono, usuario_fk) FROM stdin;
5	Juan Pérez	5551234567	2
6	María López	5559876543	2
7	Juan Pérez	5551234567	2
8	María López	5559876543	2
\.


--
-- Data for Name: detallesventa; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".detallesventa (detallesventa_pk, cantidad, ventas_fk, medicamentos_fk) FROM stdin;
\.


--
-- Data for Name: distribuidor; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".distribuidor (distribuidor_pk, nombrecompleto, telefono) FROM stdin;
3	Farmacéutica XYZ	5551112222
4	Medicamentos ABC	5553334444
5	Farmacéutica XYZ	5551112222
6	Medicamentos ABC	5553334444
7	Farmacéutica XYZ	5551112222
8	Medicamentos ABC	5553334444
\.


--
-- Data for Name: distribuidormedicamento; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".distribuidormedicamento (dismedicamento_pk, fecha_expiracion, cantidadcompra, medicamento_fk, distribuidor_fk) FROM stdin;
\.


--
-- Data for Name: empleado; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".empleado (empleado_pk, nombrecompleto, usuario_fk) FROM stdin;
4	Carlos Rodríguez	3
5	Carlos Rodríguez	3
\.


--
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".medicamentos (medicamento_pk, nombre, precio, tama_o, presentacion_fk, cantidaddisponible) FROM stdin;
7	Paracetamol	5.5	500mg	1	100
8	Ibuprofeno	8.75	400mg	1	150
9	Paracetamol	5.5	500mg	1	100
10	Ibuprofeno	8.75	400mg	1	150
11	Paracetamol	5.5	500mg	1	100
12	Ibuprofeno	8.75	400mg	1	150
\.


--
-- Data for Name: presentacion; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".presentacion (presentacion_pk, descripcion) FROM stdin;
1	Tableta
2	Cápsula
3	Tableta
4	Cápsula
5	Tableta
6	Cápsula
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".rol (rol_pk, descripcion) FROM stdin;
1	Administrador
2	Cliente
3	Empleado
4	Administrador
5	Cliente
6	Empleado
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".usuario (usuario_pk, fechacreacion, correo, contrase_a, rol_fk) FROM stdin;
1	2024-03-22	admin@example.com	admin123	1
2	2024-03-22	cliente@example.com	cliente123	2
3	2024-03-22	empleado@example.com	empleado123	3
4	2024-03-22	admin@example.com	admin123	1
5	2024-03-22	cliente@example.com	cliente123	2
6	2024-03-22	empleado@example.com	empleado123	3
\.


--
-- Data for Name: ventas; Type: TABLE DATA; Schema: FarmaNova; Owner: postgres
--

COPY "FarmaNova".ventas (ventas_pk, fechaventa, empleado_fk, cliente_fk) FROM stdin;
\.


--
-- Data for Name: Devoluciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Devoluciones" (devoluciones_pk, descripcion, cantidad, medicamento_fk) FROM stdin;
\.


--
-- Data for Name: FormaFarmaceutica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FormaFarmaceutica" ("formaFarmaceutica_pk", nombre) FROM stdin;
1	Tableta
2	Cápsula
3	Jarabe
4	Suspensión
5	Crema
6	Pomada
7	Ungüento
8	Inyección
9	Ampolla
10	Spray
11	Supositorio
12	Gel
13	Parches
14	Tableta efervescente
15	Polvo
16	Láminas
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bb4d6e8a-ae85-4e3d-8af9-2bc2f90c4eb4	1d800d7a6022d7ac69b1a3744e4810309f277b056f8f42a94819fd1524a0025f	2025-05-27 02:39:37.394044+00	20250330235537_migration	\N	\N	2025-05-27 02:39:37.37965+00	1
ef682145-66f7-4421-a495-d9e1a515d3f9	f00f8f49e6c24616a56c6f71ea74b18b139875f567a2363f1376a76aec1d2675	2025-05-27 02:39:37.079511+00	20250319185712_migration	\N	\N	2025-05-27 02:39:37.01775+00	1
b6eea997-e308-400b-a62c-67995034a860	cfa6d8b2cf9628ea075e4f6c39362f7224d33371841d9d9b4bf2317eb8e6afd6	2025-05-27 02:39:37.101023+00	20250323045657_migration	\N	\N	2025-05-27 02:39:37.08514+00	1
1262eee3-eda9-4f32-a2d6-7f2ab93e9f01	616fbca51241c735559a31d0608578a7f5a12d7e30b14951601b9cc31bccbc0b	2025-05-27 02:39:37.598361+00	20250401041544_migration	\N	\N	2025-05-27 02:39:37.583692+00	1
dfee56f2-bd27-4d90-84b9-8ac48d5fcd5c	cf6f2ef46b42903730b1bf281dea947b848a9c6dcec4415ebc992cb7fea413d4	2025-05-27 02:39:37.126409+00	20250323065314_migration	\N	\N	2025-05-27 02:39:37.105504+00	1
a5cec0fc-4267-44bc-9ad7-639879fbffb1	424e3c523313ba1c5e7dca8b9adc8b92a54abd93df994a87c6ae28b0b19e386f	2025-05-27 02:39:37.415182+00	20250331033754_migration	\N	\N	2025-05-27 02:39:37.399132+00	1
e8fc97d0-1338-43a2-b1c1-8afc5efc0d9b	e239ce336da9e82e1157e3e52a961ff6aac2ef4dd6ca1b2796aa2856636a6f48	2025-05-27 02:39:37.158077+00	20250325045217_migration	\N	\N	2025-05-27 02:39:37.131933+00	1
44ce2b86-3c32-4b44-a24e-9bb78feb9124	e78c97eca5855bd79262fcbbec9634e3be3b48ade709dd1369a03040d8188ca0	2025-05-27 02:39:37.179672+00	20250326151726_migration	\N	\N	2025-05-27 02:39:37.163884+00	1
4beafeeb-0904-4bca-a0b1-a20bb00df9fb	21f0acd775fe9653af4cc02e66ff612bdb3efa30e1fc1d1c11307a0570a58cf0	2025-05-27 02:39:37.222017+00	20250329144259_add_tables	\N	\N	2025-05-27 02:39:37.18506+00	1
b15d7262-a9dc-4ad1-9ee0-d10ee881768b	441bf9b34de1065ef71165889cae8eac8b3ce18fbcca24d3ef38642594da620e	2025-05-27 02:39:37.445587+00	20250331034409_migration	\N	\N	2025-05-27 02:39:37.419633+00	1
c9f4dbf6-ed70-4dda-8705-147ab06ec768	1aad17a26d270d59b359459fe6863a6668fdf4947bc1447c6b013b374f16dbf1	2025-05-27 02:39:37.248565+00	20250329150040_add_tables	\N	\N	2025-05-27 02:39:37.227549+00	1
7b876e8c-1d9b-4b94-8021-af234b964017	c6819bb6942e2fa7393d3fbb044a2063103dddb0246e8d886698bd0493d1d6ec	2025-05-27 02:39:37.267964+00	20250329152510_change_medicamentos_field	\N	\N	2025-05-27 02:39:37.253467+00	1
94cb2858-9642-42c3-b34e-020d7337b0f2	3f4b73e8aa19de6f597ad35b789249865e62080236048b3438f1b3accdb764fa	2025-05-27 02:39:37.794739+00	20250521024615_migrate	\N	\N	2025-05-27 02:39:37.766646+00	1
a1a72632-39f7-4eb3-86c4-d495253a7483	8899ef4cb96a706996b85adf5e31f462f33172f31960b3da680bdb6a7685dfa2	2025-05-27 02:39:37.292796+00	20250329153512_change_name_category	\N	\N	2025-05-27 02:39:37.273115+00	1
a08809e1-99f6-40fd-8f52-e74509c85a6c	e092d572bb98afdb9bb2948b6b9793551fa70f8876cb9b15596524e95ce40492	2025-05-27 02:39:37.466126+00	20250331034605_migration	\N	\N	2025-05-27 02:39:37.450362+00	1
ce5f5645-90ca-462d-9806-c9e399ce94de	9aa535fc59bea0b9b0ed7dd1be69ac6f34f34af4d7a5610deecb59292a0b3a04	2025-05-27 02:39:37.312762+00	20250329222202_modify_variant	\N	\N	2025-05-27 02:39:37.297925+00	1
5cfee956-ae4c-401c-a6ee-75dfa1211fe2	0c01877a26ac1621965664a22f0071c30f64b13655a70ebeb68a87d5897095f1	2025-05-27 02:39:37.332738+00	20250329222605_modify_variant	\N	\N	2025-05-27 02:39:37.31803+00	1
1842c240-bf01-41e3-9ee8-5ebb0cfb0842	fc6add3e96f8aba1a4846b7386ae8d1a01be153c8648e3ecb3c17f93db607ee6	2025-05-27 02:39:37.619202+00	20250401051931_migration	\N	\N	2025-05-27 02:39:37.603126+00	1
e979944a-774e-4b2d-9f30-d1e0e5606e2f	3745cf95c7d4e723a1e6486b9f5445b5648a3be9bc53296962842778c427f387	2025-05-27 02:39:37.354643+00	20250330222051_migration	\N	\N	2025-05-27 02:39:37.337949+00	1
2279b78c-94cc-4b3e-baf7-6b8aadd335af	c2f3d454786776181a528d83fa4f79e8a1e1e2a55b76ac3d3fc28589a8a2db36	2025-05-27 02:39:37.493581+00	20250331074341_migrate	\N	\N	2025-05-27 02:39:37.470865+00	1
ef9437f4-9529-453f-842e-0fbb8d1dc95c	fac524170b0ffd55d81f612fa4592a3ca31ba2272442dfd2f38d34131f7ff160	2025-05-27 02:39:37.374033+00	20250330234130_migration	\N	\N	2025-05-27 02:39:37.360342+00	1
be667b54-9576-4c24-8d14-4c9633acf709	52d7ce857c6b70ce8127d45bb4d882aa3f8b240fd3751d7f654c807e0e52a170	2025-05-27 02:39:37.724056+00	20250402100347_migration	\N	\N	2025-05-27 02:39:37.707922+00	1
a2a50b2d-902a-46d0-85bd-989428ceb72e	e8b891311904257f0fb09f8d21ebf407e72aef9077ecf324bbacb289e60b87f0	2025-05-27 02:39:37.51325+00	20250331074621_migration	\N	\N	2025-05-27 02:39:37.498739+00	1
277a6a30-2250-4612-ba9d-fc9c9e3b840a	3b895af3ed425111c3d019a19adccd50ab55244f1c7dbd4346d0a330ee251e97	2025-05-27 02:39:37.638594+00	20250401053103_migration	\N	\N	2025-05-27 02:39:37.623816+00	1
dfc30eab-83e4-4f83-a7d9-3c2780bf2669	e2fe575c9ac75a28ba44069001219679efa5b617686e5468582c5b252aab0b2a	2025-05-27 02:39:37.53378+00	20250331075121_migration	\N	\N	2025-05-27 02:39:37.518686+00	1
4a291bdc-3bc0-48ce-9b85-3bb7aa74bd90	5931cc413fe009389a190c084e7797dd743efb30126c7a6db956b7b14ee27fde	2025-05-27 02:39:37.555996+00	20250331081431_migration	\N	\N	2025-05-27 02:39:37.541726+00	1
f2cb6ecf-46bd-4b69-b14e-170b5eda5d4c	fc2cf4246686d88bc9e4bf340808e624e08c2979303f694c5e6428736ef26e98	2025-05-27 02:39:37.578654+00	20250331153717_migration	\N	\N	2025-05-27 02:39:37.561858+00	1
19775dc3-c262-494e-99f0-e9d57d6d086c	7b84335efe73471225f0409241d583a83855ae9c8f3ded271ddf1d72db0427ef	2025-05-27 02:39:37.665261+00	20250401155132_migration	\N	\N	2025-05-27 02:39:37.644477+00	1
f44a6939-bd15-4989-950e-7e8364b588f4	3d25af2e934091f6702a34e819a11cc7cbd66f79c71f68ed5c9f100618d02aa5	2025-05-27 02:39:37.742735+00	20250417152537_add_indexes	\N	\N	2025-05-27 02:39:37.728807+00	1
59f01628-9410-4cde-b2cf-612ff09f8d1c	00e43aa273f972c075e36dd90ad9087544374b30662d00725cfe6782321354cc	2025-05-27 02:39:37.683895+00	20250402063532_migration	\N	\N	2025-05-27 02:39:37.669975+00	1
7136ea9a-8c7f-40c6-847c-f7453234db39	0c4ecfe7bf11736c8f0f0c08942d596fcbe1c015410ef2d8fa4cb3be8ef016ab	2025-05-27 02:39:37.702369+00	20250402095758_migration	\N	\N	2025-05-27 02:39:37.688033+00	1
68a3871c-5f10-4359-a4c5-b9b7f23ff475	1d7ee490bf08793ef90a7f16a2662166fe4eaf14428722c3e963072b6b63d347	2025-05-27 02:39:37.882613+00	20250526044621_migration	\N	\N	2025-05-27 02:39:37.866799+00	1
f1b75a40-a670-4488-984d-3eb63d18614c	dfb7c6da854c063fdc2467edad963a2f587aa3c93877761470c3cf08b4bfc621	2025-05-27 02:39:37.761954+00	20250418003138_delete_expiration_date_field	\N	\N	2025-05-27 02:39:37.747625+00	1
4d076c9e-bd47-4899-8351-33e3660505ae	bc0ad0cf13ae3747efb359229d1a4a7e2830cbfdd1433229d70f434db1a3d058	2025-05-27 02:39:37.860824+00	20250521030617_migrate	\N	\N	2025-05-27 02:39:37.839492+00	1
3bf0db0c-99f7-4063-8dcc-3179dd9a117a	e4536e2aeae56b2176610756fbb1fa94fc180ec5204cae1cab668c3bf21bafc0	2025-05-27 02:39:37.815088+00	20250521024901_migrate	\N	\N	2025-05-27 02:39:37.800143+00	1
33dc5eae-c8db-4995-9bc3-0a8f94289cea	68baf85fc134f374bfd618dce7da735e0df9d41b05ed72d73e5deece4dd828b2	2025-05-27 02:39:37.834546+00	20250521030039_migrate	\N	\N	2025-05-27 02:39:37.819985+00	1
6e5edf0b-eb14-48ef-a73e-8988b575911f	73bd46f01f9b7987b74333557477939dc97a47008f374cd1eda4a7a127366ee8	2025-05-27 02:39:55.57632+00	20250527023955_migration	\N	\N	2025-05-27 02:39:55.557478+00	1
6b72bd25-69fb-47c1-ae39-337831d596f0	2e157808eb4f43d7952f4a877115c3ae42974b530dae69e6c5011c9084b3e77a	2025-05-27 02:41:19.088948+00	20250527024119_migration	\N	\N	2025-05-27 02:41:19.073669+00	1
ec0e67d7-c93a-473d-b60f-291ea40ce2ea	e9fa1b43cc3494bc314ded745b45e522a943da7db1378703cea88776504364bc	2025-05-27 03:23:16.528231+00	20250527032316_migration	\N	\N	2025-05-27 03:23:16.48852+00	1
7e143cb4-d580-49f5-8893-be71001ec47d	bab3d97600d2641d30112f7f6c32bfa4dff96248d416485823582dbf8669731a	2025-05-27 03:47:04.311945+00	20250527034704_migration	\N	\N	2025-05-27 03:47:04.270417+00	1
\.


--
-- Data for Name: accionTera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."accionTera" ("accionTerapeutica_pk", descripcion) FROM stdin;
1	Antibióticos
2	Analgésicos
3	Antiácidos
4	Antiinflamatorios
5	Psicofármacos
6	Endocrinología
7	Antihipertensivos
8	Antidiabéticos
\.


--
-- Data for Name: accionmedicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accionmedicamentos (catmed_pk, "accionTerapeutica_fk", medicamento_fk) FROM stdin;
1	2	1
2	5	1
3	4	2
4	6	2
5	2	2
6	4	3
7	2	3
8	2	4
9	4	4
10	4	5
11	4	6
12	3	7
13	4	8
14	3	9
15	2	10
16	5	10
17	2	11
\.


--
-- Data for Name: detallespedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detallespedidos (detallespedidos_pk, fecha_expiracion, cantidad, pedidos_fk, precioventa, medicamento_fk) FROM stdin;
\.


--
-- Data for Name: detallesventa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detallesventa (detallesventa_pk, cantidad, ventas_fk, medicamento_fk) FROM stdin;
1	2	3	1
2	2	4	1
3	1	5	1
4	2	6	1
5	2	7	1
6	2	8	1
7	1	9	1
\.


--
-- Data for Name: distribuidor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.distribuidor (distribuidor_pk, nombrecompleto, telefono, empresa_fk) FROM stdin;
1	Eliezer Jose Acuña Matus	57200076	1
2	Enghell Yosuarin Zelaya	85967598	9
3	Luis Carlos Jaen Rojas	87569856	4
4	Kelly Maribyth Vallecillo Bustos	58963256	5
\.


--
-- Data for Name: empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleado (empleado_pk, nombrecompleto, usuario_fk) FROM stdin;
1	Administrador	0
\.


--
-- Data for Name: empresa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empresa (empresa_pk, descripcion) FROM stdin;
1	Laboratorios Ramos
2	Laboratorios Solka
3	Laboratorios LANCAS
4	Laboratorios Rarpe
5	Laboratorios Vega
6	Laboratorios Infarma
7	Laboratorios Menic
8	Laboratorios Farinter
9	Laboratorios Medco
10	Laboratorios Ceguel
\.


--
-- Data for Name: medicamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medicamento (imagen, medicamento_pk, "codigoBarra", "requierePrescripcion", "EstadoMedicamento", "EstadoMedicamentoExpirado", forma_fk, "precioVenta", "cantidadMinima", "cantidadMaxima", via, "fechaCreacion", "fechaModificacion", stock, descripcion, "precioCompra", empresa_fk) FROM stdin;
uploads/1748320954980.png	2	789654	t	DISPONIBLE	DISPONIBLE	5	50.000000000000000000000000000000	10	30	Inhalatoria	2025-05-27	2025-05-27	0	Eliezer José Acuña Matus	50.000000000000000000000000000000	5
uploads/1748313910929.jpg	1	789654	t	DISPONIBLE	DISPONIBLE	5	50.000000000000000000000000000000	20	30	Bucofaríngea o Bucal	2025-05-27	2025-05-27	0		10.000000000000000000000000000000	3
\N	3	87876564	t	DISPONIBLE	DISPONIBLE	4	50.000000000000000000000000000000	2	50	Nasal	2025-05-27	2025-05-27	0	Ejemplo2	20.000000000000000000000000000000	2
uploads/1748360912928.gif	4	54789654	t	DISPONIBLE	DISPONIBLE	4	100.000000000000000000000000000000	2	90	Bucofaríngea o Bucal	2025-05-27	2025-05-27	0	Ejemplo 1	50.000000000000000000000000000000	3
\N	5	989182	t	DISPONIBLE	DISPONIBLE	4	0.000000000000000000000000000000	0	0	Inhalatoria	2025-05-27	2025-05-27	0	Ejemplo 5	0.000000000000000000000000000000	3
\N	6	98912371	f	DISPONIBLE	DISPONIBLE	3	0.000000000000000000000000000000	0	0	Nasal	2025-05-27	2025-05-27	0	Ejemplo mas	0.000000000000000000000000000000	3
\N	7	454	f	DISPONIBLE	DISPONIBLE	4	0.000000000000000000000000000000	0	0	Rectal	2025-05-27	2025-05-27	0	Eliezer José Acuña Matus	0.000000000000000000000000000000	3
\N	8	6565	f	DISPONIBLE	DISPONIBLE	3	0.000000000000000000000000000000	0	0	Nasal	2025-05-27	2025-05-27	0	Hello	0.000000000000000000000000000000	2
uploads/1748361426102.png	9	5656556	t	DISPONIBLE	DISPONIBLE	4	0.000000000000000000000000000000	0	0	Rectal	2025-05-27	2025-05-27	0	Probando M	0.000000000000000000000000000000	3
\N	10	645487	f	DISPONIBLE	DISPONIBLE	1	0.000000000000000000000000000000	0	0	Oral	2025-05-27	2025-05-27	0	Ejemplo sin 	0.000000000000000000000000000000	1
uploads/1748405141921.gif	11	4444	f	DISPONIBLE	DISPONIBLE	3	0.000000000000000000000000000000	0	0	Oral	2025-05-28	2025-05-28	0	Estoy	0.000000000000000000000000000000	1
\.


--
-- Data for Name: medicamentoSintoma; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."medicamentoSintoma" ("medicaSintoma", medicamento_fk, sintomas_fk) FROM stdin;
1	5	3
2	9	9
3	9	10
4	9	11
5	10	3
6	10	12
7	10	13
8	11	14
\.


--
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedidos (pedidos_pk, "fechaPedido", empleado_fk, distribuidor_fk, estado, "fechaEntrega") FROM stdin;
\.


--
-- Data for Name: sintomas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sintomas (sintoma_pk, descripcion) FROM stdin;
1	Dolores de cabeza
2	Fiebre
3	dolor de estomago
4	Migraña
5	Congestion
6	Migraña
7	Congestion
8	Miraculos
9	mierdaton
10	faringitis
11	migraña
12	fiebre
13	malestar
14	dolores de cabeza
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (usuario_pk, fechacreacion, correo, contrase_a, rol) FROM stdin;
1	1970-01-01	eacuna042@gmail.com		ADMINISTRADOR
\.


--
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas (ventas_pk, fechaventa, empleado_fk, estado, "pagaCon", total) FROM stdin;
2	2025-05-27	1	COMPLETADO	100	0
3	2025-05-27	1	COMPLETADO	100	0
4	2025-05-27	1	COMPLETADO	100	0
5	2025-05-27	1	COMPLETADO	200	0
6	2025-05-27	1	COMPLETADO	200	0
7	2025-05-27	1	COMPLETADO	200	100
8	2025-05-27	1	COMPLETADO	0	100
9	2025-05-27	1	COMPLETADO	0	50
\.


--
-- Name: categoriamedicamentos_catmed_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".categoriamedicamentos_catmed_pk_seq', 4, true);


--
-- Name: cateogoria_categoria_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".cateogoria_categoria_pk_seq', 12, true);


--
-- Name: cliente_cliente_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".cliente_cliente_pk_seq', 8, true);


--
-- Name: detallesventa_detallesventa_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".detallesventa_detallesventa_pk_seq', 1, false);


--
-- Name: distribuidor_distribuidor_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".distribuidor_distribuidor_pk_seq', 8, true);


--
-- Name: distribuidormedicamento_dismedicamento_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".distribuidormedicamento_dismedicamento_pk_seq', 1, false);


--
-- Name: empleado_empleado_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".empleado_empleado_pk_seq', 5, true);


--
-- Name: medicamentos_medicamento_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".medicamentos_medicamento_pk_seq', 12, true);


--
-- Name: presentacion_presentacion_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".presentacion_presentacion_pk_seq', 6, true);


--
-- Name: rol_rol_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".rol_rol_pk_seq', 6, true);


--
-- Name: usuario_usuario_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".usuario_usuario_pk_seq', 6, true);


--
-- Name: ventas_ventas_pk_seq; Type: SEQUENCE SET; Schema: FarmaNova; Owner: postgres
--

SELECT pg_catalog.setval('"FarmaNova".ventas_ventas_pk_seq', 2, true);


--
-- Name: Devoluciones_devoluciones_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Devoluciones_devoluciones_pk_seq"', 1, false);


--
-- Name: FormaFarmaceutica_formaFarmaceutica_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FormaFarmaceutica_formaFarmaceutica_pk_seq"', 16, true);


--
-- Name: accionTera_accionTerapeutica_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."accionTera_accionTerapeutica_pk_seq"', 8, true);


--
-- Name: accionmedicamentos_catmed_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accionmedicamentos_catmed_pk_seq', 17, true);


--
-- Name: detallespedidos_detallespedidos_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallespedidos_detallespedidos_pk_seq', 1, false);


--
-- Name: detallesventa_detallesventa_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallesventa_detallesventa_pk_seq', 7, true);


--
-- Name: distribuidor_distribuidor_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.distribuidor_distribuidor_pk_seq', 4, true);


--
-- Name: empleado_empleado_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleado_empleado_pk_seq', 1, true);


--
-- Name: empresa_empresa_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empresa_empresa_pk_seq', 10, true);


--
-- Name: medicamentoSintoma_medicaSintoma_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."medicamentoSintoma_medicaSintoma_seq"', 8, true);


--
-- Name: medicamento_medicamento_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicamento_medicamento_pk_seq', 11, true);


--
-- Name: pedidos_pedidos_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedidos_pedidos_pk_seq', 1, false);


--
-- Name: sintomas_sintoma_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sintomas_sintoma_pk_seq', 14, true);


--
-- Name: usuario_usuario_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_usuario_pk_seq', 1, true);


--
-- Name: ventas_ventas_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_ventas_pk_seq', 9, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova"._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: categoriamedicamentos categoriamedicamentos_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".categoriamedicamentos
    ADD CONSTRAINT categoriamedicamentos_pk PRIMARY KEY (catmed_pk);


--
-- Name: cateogoria cateogoria_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".cateogoria
    ADD CONSTRAINT cateogoria_pk PRIMARY KEY (categoria_pk);


--
-- Name: cliente cliente_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".cliente
    ADD CONSTRAINT cliente_pk PRIMARY KEY (cliente_pk);


--
-- Name: detallesventa detallesventa_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".detallesventa
    ADD CONSTRAINT detallesventa_pk PRIMARY KEY (detallesventa_pk);


--
-- Name: distribuidor distribuidor_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".distribuidor
    ADD CONSTRAINT distribuidor_pk PRIMARY KEY (distribuidor_pk);


--
-- Name: distribuidormedicamento distribuidormedicamento_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".distribuidormedicamento
    ADD CONSTRAINT distribuidormedicamento_pk PRIMARY KEY (dismedicamento_pk);


--
-- Name: empleado empleado_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".empleado
    ADD CONSTRAINT empleado_pk PRIMARY KEY (empleado_pk);


--
-- Name: medicamentos medicamentos_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".medicamentos
    ADD CONSTRAINT medicamentos_pk PRIMARY KEY (medicamento_pk);


--
-- Name: presentacion presentacion_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".presentacion
    ADD CONSTRAINT presentacion_pk PRIMARY KEY (presentacion_pk);


--
-- Name: rol rol_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".rol
    ADD CONSTRAINT rol_pk PRIMARY KEY (rol_pk);


--
-- Name: usuario usuario_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".usuario
    ADD CONSTRAINT usuario_pk PRIMARY KEY (usuario_pk);


--
-- Name: ventas ventas_pk; Type: CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".ventas
    ADD CONSTRAINT ventas_pk PRIMARY KEY (ventas_pk);


--
-- Name: FormaFarmaceutica FormaFarmaceutica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FormaFarmaceutica"
    ADD CONSTRAINT "FormaFarmaceutica_pkey" PRIMARY KEY ("formaFarmaceutica_pk");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: accionTera accionTerapeutica_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."accionTera"
    ADD CONSTRAINT "accionTerapeutica_pk" PRIMARY KEY ("accionTerapeutica_pk");


--
-- Name: accionmedicamentos categoriamedicamentos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accionmedicamentos
    ADD CONSTRAINT categoriamedicamentos_pk PRIMARY KEY (catmed_pk);


--
-- Name: detallespedidos detallespedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallespedidos
    ADD CONSTRAINT detallespedidos_pkey PRIMARY KEY (detallespedidos_pk);


--
-- Name: detallesventa detallesventa_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallesventa
    ADD CONSTRAINT detallesventa_pk PRIMARY KEY (detallesventa_pk);


--
-- Name: Devoluciones devoluciones_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devoluciones"
    ADD CONSTRAINT devoluciones_pk PRIMARY KEY (devoluciones_pk);


--
-- Name: distribuidor distribuidor_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distribuidor
    ADD CONSTRAINT distribuidor_pk PRIMARY KEY (distribuidor_pk);


--
-- Name: empleado empleado_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pk PRIMARY KEY (empleado_pk);


--
-- Name: empresa empresa_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_pk PRIMARY KEY (empresa_pk);


--
-- Name: medicamentoSintoma medicamentoSintoma_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."medicamentoSintoma"
    ADD CONSTRAINT "medicamentoSintoma_pkey" PRIMARY KEY ("medicaSintoma");


--
-- Name: medicamento medicamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamento
    ADD CONSTRAINT medicamento_pkey PRIMARY KEY (medicamento_pk);


--
-- Name: pedidos pedidos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pk PRIMARY KEY (pedidos_pk);


--
-- Name: sintomas sintomas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sintomas
    ADD CONSTRAINT sintomas_pkey PRIMARY KEY (sintoma_pk);


--
-- Name: usuario usuario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pk PRIMARY KEY (usuario_pk);


--
-- Name: ventas ventas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pk PRIMARY KEY (ventas_pk);


--
-- Name: FormaFarmaceutica_nombre_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "FormaFarmaceutica_nombre_key" ON public."FormaFarmaceutica" USING btree (nombre);


--
-- Name: fechaCreacion; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fechaCreacion" ON public.medicamento USING btree ("fechaCreacion");


--
-- Name: categoriamedicamentos categoriamedicamentos_cateogoria_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".categoriamedicamentos
    ADD CONSTRAINT categoriamedicamentos_cateogoria_fk FOREIGN KEY (categoria_fk) REFERENCES "FarmaNova".cateogoria(categoria_pk);


--
-- Name: categoriamedicamentos categoriamedicamentos_medicamentos_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".categoriamedicamentos
    ADD CONSTRAINT categoriamedicamentos_medicamentos_fk FOREIGN KEY (medicamento_fk) REFERENCES "FarmaNova".medicamentos(medicamento_pk);


--
-- Name: cliente cliente_usuario_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".cliente
    ADD CONSTRAINT cliente_usuario_fk FOREIGN KEY (usuario_fk) REFERENCES "FarmaNova".usuario(usuario_pk);


--
-- Name: detallesventa detallesventa_medicamentos_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".detallesventa
    ADD CONSTRAINT detallesventa_medicamentos_fk FOREIGN KEY (medicamentos_fk) REFERENCES "FarmaNova".medicamentos(medicamento_pk);


--
-- Name: detallesventa detallesventa_ventas_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".detallesventa
    ADD CONSTRAINT detallesventa_ventas_fk FOREIGN KEY (ventas_fk) REFERENCES "FarmaNova".ventas(ventas_pk);


--
-- Name: distribuidormedicamento distribuidormedicamento_distribuidor_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".distribuidormedicamento
    ADD CONSTRAINT distribuidormedicamento_distribuidor_fk FOREIGN KEY (distribuidor_fk) REFERENCES "FarmaNova".distribuidor(distribuidor_pk);


--
-- Name: distribuidormedicamento distribuidormedicamento_medicamentos_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".distribuidormedicamento
    ADD CONSTRAINT distribuidormedicamento_medicamentos_fk FOREIGN KEY (medicamento_fk) REFERENCES "FarmaNova".medicamentos(medicamento_pk);


--
-- Name: medicamentos medicamentos_presentacion_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".medicamentos
    ADD CONSTRAINT medicamentos_presentacion_fk FOREIGN KEY (presentacion_fk) REFERENCES "FarmaNova".presentacion(presentacion_pk);


--
-- Name: usuario usuario_rol_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".usuario
    ADD CONSTRAINT usuario_rol_fk FOREIGN KEY (rol_fk) REFERENCES "FarmaNova".rol(rol_pk);


--
-- Name: ventas ventas_cliente_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".ventas
    ADD CONSTRAINT ventas_cliente_fk FOREIGN KEY (cliente_fk) REFERENCES "FarmaNova".cliente(cliente_pk);


--
-- Name: ventas ventas_empleado_fk; Type: FK CONSTRAINT; Schema: FarmaNova; Owner: postgres
--

ALTER TABLE ONLY "FarmaNova".ventas
    ADD CONSTRAINT ventas_empleado_fk FOREIGN KEY (empleado_fk) REFERENCES "FarmaNova".empleado(empleado_pk);


--
-- Name: accionmedicamentos categoriamedicamentos_categoria_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accionmedicamentos
    ADD CONSTRAINT categoriamedicamentos_categoria_fk FOREIGN KEY ("accionTerapeutica_fk") REFERENCES public."accionTera"("accionTerapeutica_pk");


--
-- Name: accionmedicamentos categoriamedicamentos_medicamentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accionmedicamentos
    ADD CONSTRAINT categoriamedicamentos_medicamentos_fk FOREIGN KEY (medicamento_fk) REFERENCES public.medicamento(medicamento_pk);


--
-- Name: detallespedidos detallespedidos_medicamentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallespedidos
    ADD CONSTRAINT detallespedidos_medicamentos_fk FOREIGN KEY (medicamento_fk) REFERENCES public.medicamento(medicamento_pk);


--
-- Name: detallespedidos detallespedidos_pedidos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallespedidos
    ADD CONSTRAINT detallespedidos_pedidos_fk FOREIGN KEY (pedidos_fk) REFERENCES public.pedidos(pedidos_pk);


--
-- Name: detallesventa detallesventa_medicamentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallesventa
    ADD CONSTRAINT detallesventa_medicamentos_fk FOREIGN KEY (medicamento_fk) REFERENCES public.medicamento(medicamento_pk);


--
-- Name: detallesventa detallesventa_ventas_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallesventa
    ADD CONSTRAINT detallesventa_ventas_fk FOREIGN KEY (ventas_fk) REFERENCES public.ventas(ventas_pk);


--
-- Name: Devoluciones devoluciones_medicamentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devoluciones"
    ADD CONSTRAINT devoluciones_medicamentos_fk FOREIGN KEY (medicamento_fk) REFERENCES public.medicamento(medicamento_pk);


--
-- Name: distribuidor distribuidor_empresa_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distribuidor
    ADD CONSTRAINT distribuidor_empresa_fk FOREIGN KEY (empresa_fk) REFERENCES public.empresa(empresa_pk);


--
-- Name: pedidos distribuidormedicamento_distribuidor_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT distribuidormedicamento_distribuidor_fk FOREIGN KEY (distribuidor_fk) REFERENCES public.distribuidor(distribuidor_pk);


--
-- Name: medicamentoSintoma medicamentoSintoma_medicamento_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."medicamentoSintoma"
    ADD CONSTRAINT "medicamentoSintoma_medicamento_fk_fkey" FOREIGN KEY (medicamento_fk) REFERENCES public.medicamento(medicamento_pk) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: medicamentoSintoma medicamentoSintoma_sintomas_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."medicamentoSintoma"
    ADD CONSTRAINT "medicamentoSintoma_sintomas_fk_fkey" FOREIGN KEY (sintomas_fk) REFERENCES public.sintomas(sintoma_pk) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: medicamento medicamento_empresa_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamento
    ADD CONSTRAINT medicamento_empresa_fk_fkey FOREIGN KEY (empresa_fk) REFERENCES public.empresa(empresa_pk) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: medicamento medicamento_forma_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamento
    ADD CONSTRAINT medicamento_forma_fk_fkey FOREIGN KEY (forma_fk) REFERENCES public."FormaFarmaceutica"("formaFarmaceutica_pk") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ventas ventas_empleado_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_empleado_fk FOREIGN KEY (empleado_fk) REFERENCES public.empleado(empleado_pk);


--
-- Name: pedidos ventas_empleado_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT ventas_empleado_fk FOREIGN KEY (empleado_fk) REFERENCES public.empleado(empleado_pk);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

