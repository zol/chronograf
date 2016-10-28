// Code generated by protoc-gen-gogo.
// source: internal.proto
// DO NOT EDIT!

/*
Package internal is a generated protocol buffer package.

It is generated from these files:
	internal.proto

It has these top-level messages:
	Exploration
	Source
	Server
	Layout
	Cell
	Query
*/
package internal

import proto "github.com/gogo/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion2 // please upgrade the proto package

type Exploration struct {
	ID        int64  `protobuf:"varint,1,opt,name=ID,proto3" json:"ID,omitempty"`
	Name      string `protobuf:"bytes,2,opt,name=Name,proto3" json:"Name,omitempty"`
	UserID    int64  `protobuf:"varint,3,opt,name=UserID,proto3" json:"UserID,omitempty"`
	Data      string `protobuf:"bytes,4,opt,name=Data,proto3" json:"Data,omitempty"`
	CreatedAt int64  `protobuf:"varint,5,opt,name=CreatedAt,proto3" json:"CreatedAt,omitempty"`
	UpdatedAt int64  `protobuf:"varint,6,opt,name=UpdatedAt,proto3" json:"UpdatedAt,omitempty"`
	Default   bool   `protobuf:"varint,7,opt,name=Default,proto3" json:"Default,omitempty"`
}

func (m *Exploration) Reset()                    { *m = Exploration{} }
func (m *Exploration) String() string            { return proto.CompactTextString(m) }
func (*Exploration) ProtoMessage()               {}
func (*Exploration) Descriptor() ([]byte, []int) { return fileDescriptorInternal, []int{0} }

type Source struct {
	ID       int64  `protobuf:"varint,1,opt,name=ID,proto3" json:"ID,omitempty"`
	Name     string `protobuf:"bytes,2,opt,name=Name,proto3" json:"Name,omitempty"`
	Type     string `protobuf:"bytes,3,opt,name=Type,proto3" json:"Type,omitempty"`
	Username string `protobuf:"bytes,4,opt,name=Username,proto3" json:"Username,omitempty"`
	Password string `protobuf:"bytes,5,opt,name=Password,proto3" json:"Password,omitempty"`
	URL      string `protobuf:"bytes,6,opt,name=URL,proto3" json:"URL,omitempty"`
	Default  bool   `protobuf:"varint,7,opt,name=Default,proto3" json:"Default,omitempty"`
}

func (m *Source) Reset()                    { *m = Source{} }
func (m *Source) String() string            { return proto.CompactTextString(m) }
func (*Source) ProtoMessage()               {}
func (*Source) Descriptor() ([]byte, []int) { return fileDescriptorInternal, []int{1} }

type Server struct {
	ID       int64  `protobuf:"varint,1,opt,name=ID,proto3" json:"ID,omitempty"`
	Name     string `protobuf:"bytes,2,opt,name=Name,proto3" json:"Name,omitempty"`
	Username string `protobuf:"bytes,3,opt,name=Username,proto3" json:"Username,omitempty"`
	Password string `protobuf:"bytes,4,opt,name=Password,proto3" json:"Password,omitempty"`
	URL      string `protobuf:"bytes,5,opt,name=URL,proto3" json:"URL,omitempty"`
	SrcID    int64  `protobuf:"varint,6,opt,name=SrcID,proto3" json:"SrcID,omitempty"`
}

func (m *Server) Reset()                    { *m = Server{} }
func (m *Server) String() string            { return proto.CompactTextString(m) }
func (*Server) ProtoMessage()               {}
func (*Server) Descriptor() ([]byte, []int) { return fileDescriptorInternal, []int{2} }

type Layout struct {
	ID          string  `protobuf:"bytes,1,opt,name=ID,proto3" json:"ID,omitempty"`
	Application string  `protobuf:"bytes,2,opt,name=Application,proto3" json:"Application,omitempty"`
	Measurement string  `protobuf:"bytes,3,opt,name=Measurement,proto3" json:"Measurement,omitempty"`
	Cells       []*Cell `protobuf:"bytes,4,rep,name=Cells" json:"Cells,omitempty"`
}

func (m *Layout) Reset()                    { *m = Layout{} }
func (m *Layout) String() string            { return proto.CompactTextString(m) }
func (*Layout) ProtoMessage()               {}
func (*Layout) Descriptor() ([]byte, []int) { return fileDescriptorInternal, []int{3} }

func (m *Layout) GetCells() []*Cell {
	if m != nil {
		return m.Cells
	}
	return nil
}

type Cell struct {
	X       int32    `protobuf:"varint,1,opt,name=x,proto3" json:"x,omitempty"`
	Y       int32    `protobuf:"varint,2,opt,name=y,proto3" json:"y,omitempty"`
	W       int32    `protobuf:"varint,3,opt,name=w,proto3" json:"w,omitempty"`
	H       int32    `protobuf:"varint,4,opt,name=h,proto3" json:"h,omitempty"`
	Queries []*Query `protobuf:"bytes,5,rep,name=queries" json:"queries,omitempty"`
	I       string   `protobuf:"bytes,6,opt,name=i,proto3" json:"i,omitempty"`
	Name    string   `protobuf:"bytes,7,opt,name=name,proto3" json:"name,omitempty"`
}

func (m *Cell) Reset()                    { *m = Cell{} }
func (m *Cell) String() string            { return proto.CompactTextString(m) }
func (*Cell) ProtoMessage()               {}
func (*Cell) Descriptor() ([]byte, []int) { return fileDescriptorInternal, []int{4} }

func (m *Cell) GetQueries() []*Query {
	if m != nil {
		return m.Queries
	}
	return nil
}

type Query struct {
	Command string `protobuf:"bytes,1,opt,name=Command,proto3" json:"Command,omitempty"`
	DB      string `protobuf:"bytes,2,opt,name=DB,proto3" json:"DB,omitempty"`
	RP      string `protobuf:"bytes,3,opt,name=RP,proto3" json:"RP,omitempty"`
}

func (m *Query) Reset()                    { *m = Query{} }
func (m *Query) String() string            { return proto.CompactTextString(m) }
func (*Query) ProtoMessage()               {}
func (*Query) Descriptor() ([]byte, []int) { return fileDescriptorInternal, []int{5} }

func init() {
	proto.RegisterType((*Exploration)(nil), "internal.Exploration")
	proto.RegisterType((*Source)(nil), "internal.Source")
	proto.RegisterType((*Server)(nil), "internal.Server")
	proto.RegisterType((*Layout)(nil), "internal.Layout")
	proto.RegisterType((*Cell)(nil), "internal.Cell")
	proto.RegisterType((*Query)(nil), "internal.Query")
}

func init() { proto.RegisterFile("internal.proto", fileDescriptorInternal) }

var fileDescriptorInternal = []byte{
	// 442 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x09, 0x6e, 0x88, 0x02, 0xff, 0x8c, 0x93, 0xcf, 0x8e, 0xd3, 0x30,
	0x10, 0xc6, 0xe5, 0x24, 0x4e, 0x9b, 0x29, 0x2a, 0xc8, 0x42, 0xc8, 0x42, 0x1c, 0xa2, 0x88, 0x43,
	0xb9, 0xec, 0x01, 0x9e, 0xa0, 0xdb, 0x70, 0xa8, 0xb4, 0xa0, 0xe2, 0xa5, 0x0f, 0x60, 0x5a, 0xa3,
	0x8d, 0x94, 0x26, 0xc1, 0x71, 0x68, 0x73, 0xe5, 0x0a, 0x8f, 0xc1, 0x1b, 0xf0, 0x82, 0x68, 0x26,
	0xee, 0x9f, 0xc3, 0x6a, 0xd5, 0xdb, 0x7c, 0x33, 0x5f, 0x34, 0x3f, 0x7f, 0x76, 0x60, 0x5a, 0x54,
	0xce, 0xd8, 0x4a, 0x97, 0x37, 0x8d, 0xad, 0x5d, 0x2d, 0xc6, 0x47, 0x9d, 0xfd, 0x63, 0x30, 0xf9,
	0x78, 0x68, 0xca, 0xda, 0x6a, 0x57, 0xd4, 0x95, 0x98, 0x42, 0xb0, 0xcc, 0x25, 0x4b, 0xd9, 0x2c,
	0x54, 0xc1, 0x32, 0x17, 0x02, 0xa2, 0xcf, 0x7a, 0x67, 0x64, 0x90, 0xb2, 0x59, 0xa2, 0xa8, 0x16,
	0xaf, 0x20, 0x5e, 0xb7, 0xc6, 0x2e, 0x73, 0x19, 0x92, 0xcf, 0x2b, 0xf4, 0xe6, 0xda, 0x69, 0x19,
	0x0d, 0x5e, 0xac, 0xc5, 0x1b, 0x48, 0x16, 0xd6, 0x68, 0x67, 0xb6, 0x73, 0x27, 0x39, 0xd9, 0xcf,
	0x0d, 0x9c, 0xae, 0x9b, 0xad, 0x9f, 0xc6, 0xc3, 0xf4, 0xd4, 0x10, 0x12, 0x46, 0xb9, 0xf9, 0xae,
	0xbb, 0xd2, 0xc9, 0x51, 0xca, 0x66, 0x63, 0x75, 0x94, 0xd9, 0x5f, 0x06, 0xf1, 0x7d, 0xdd, 0xd9,
	0x8d, 0xb9, 0x0a, 0x58, 0x40, 0xf4, 0xb5, 0x6f, 0x0c, 0xe1, 0x26, 0x8a, 0x6a, 0xf1, 0x1a, 0xc6,
	0x88, 0x5d, 0xa1, 0x77, 0x00, 0x3e, 0x69, 0x9c, 0xad, 0x74, 0xdb, 0xee, 0x6b, 0xbb, 0x25, 0xe6,
	0x44, 0x9d, 0xb4, 0x78, 0x01, 0xe1, 0x5a, 0xdd, 0x11, 0x6c, 0xa2, 0xb0, 0x7c, 0x02, 0xf3, 0x0f,
	0x62, 0x1a, 0xfb, 0xd3, 0xd8, 0xab, 0x30, 0x2f, 0x91, 0xc2, 0x27, 0x90, 0xa2, 0xc7, 0x91, 0xf8,
	0x19, 0xe9, 0x25, 0xf0, 0x7b, 0xbb, 0x59, 0xe6, 0x3e, 0xd3, 0x41, 0x64, 0xbf, 0x18, 0xc4, 0x77,
	0xba, 0xaf, 0x3b, 0x77, 0x81, 0x93, 0x10, 0x4e, 0x0a, 0x93, 0x79, 0xd3, 0x94, 0xc5, 0x86, 0x5e,
	0x81, 0xa7, 0xba, 0x6c, 0xa1, 0xe3, 0x93, 0xd1, 0x6d, 0x67, 0xcd, 0xce, 0x54, 0xce, 0xf3, 0x5d,
	0xb6, 0xc4, 0x5b, 0xe0, 0x0b, 0x53, 0x96, 0xad, 0x8c, 0xd2, 0x70, 0x36, 0x79, 0x3f, 0xbd, 0x39,
	0x3d, 0x3a, 0x6c, 0xab, 0x61, 0x98, 0xfd, 0x66, 0x10, 0x61, 0x25, 0x9e, 0x01, 0x3b, 0x10, 0x01,
	0x57, 0xec, 0x80, 0xaa, 0xa7, 0xb5, 0x5c, 0xb1, 0x1e, 0xd5, 0x9e, 0x56, 0x70, 0xc5, 0xf6, 0xa8,
	0x1e, 0xe8, 0xd0, 0x5c, 0xb1, 0x07, 0xf1, 0x0e, 0x46, 0x3f, 0x3a, 0x63, 0x0b, 0xd3, 0x4a, 0x4e,
	0x8b, 0x9e, 0x9f, 0x17, 0x7d, 0xe9, 0x8c, 0xed, 0xd5, 0x71, 0x8e, 0x1f, 0x16, 0xfe, 0xa6, 0x58,
	0x81, 0x91, 0x53, 0xb4, 0xa3, 0x21, 0x72, 0xac, 0xb3, 0x39, 0x70, 0xfa, 0x06, 0x2f, 0x71, 0x51,
	0xef, 0x76, 0xba, 0xda, 0xfa, 0x54, 0x8e, 0x12, 0xa3, 0xca, 0x6f, 0x7d, 0x22, 0x41, 0x7e, 0x8b,
	0x5a, 0xad, 0xfc, 0xf9, 0x03, 0xb5, 0xfa, 0x16, 0xd3, 0x2f, 0xf5, 0xe1, 0x7f, 0x00, 0x00, 0x00,
	0xff, 0xff, 0x85, 0xa7, 0xa7, 0xb1, 0x64, 0x03, 0x00, 0x00,
}