import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Board1Component } from "./board1.component";

describe("Board1Component", () => {
  let component: Board1Component;
  let fixture: ComponentFixture<Board1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Board1Component]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Board1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
